import { cache } from "react";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export type ContentItem = {
  id: string;
  title: string;
  description: string;
  imageKey: string;
  createdAt: string;
};

export function createContentStore(namespace: string) {
  const indexKey = `${namespace}:index`;
  const itemKey = (id: string) => `${namespace}:item:${id}`;

  async function list(): Promise<ContentItem[]> {
    const { env } = await getCloudflareContext({ async: true });
    const ids = (await env.CONTENT_KV.get<string[]>(indexKey, "json")) ?? [];
    if (ids.length === 0) return [];

    const keys = ids.map(itemKey);
    const values = await env.CONTENT_KV.get<ContentItem>(keys, "json");
    return ids
      .map((id) => values.get(itemKey(id)))
      .filter((item): item is ContentItem => Boolean(item));
  }

  async function create(input: {
    title: string;
    description: string;
    imageKey: string;
  }): Promise<ContentItem> {
    const { env } = await getCloudflareContext({ async: true });
    const item: ContentItem = {
      id: crypto.randomUUID(),
      ...input,
      createdAt: new Date().toISOString(),
    };

    const ids = (await env.CONTENT_KV.get<string[]>(indexKey, "json")) ?? [];
    ids.unshift(item.id);

    await Promise.all([
      env.CONTENT_KV.put(itemKey(item.id), JSON.stringify(item)),
      env.CONTENT_KV.put(indexKey, JSON.stringify(ids)),
    ]);

    return item;
  }

  async function remove(id: string): Promise<void> {
    return removeMany([id]);
  }

  async function removeMany(ids: string[]): Promise<void> {
    if (ids.length === 0) return;
    const { env } = await getCloudflareContext({ async: true });
    const removeSet = new Set(ids);

    const [existingItems, currentIds] = await Promise.all([
      env.CONTENT_KV.get<ContentItem>(ids.map(itemKey), "json"),
      env.CONTENT_KV.get<string[]>(indexKey, "json"),
    ]);
    const nextIds = (currentIds ?? []).filter((id) => !removeSet.has(id));

    await Promise.all([
      ...ids.map((id) => env.CONTENT_KV.delete(itemKey(id))),
      env.CONTENT_KV.put(indexKey, JSON.stringify(nextIds)),
      ...ids.map((id) => {
        const existing = existingItems.get(itemKey(id));
        return existing
          ? env.CONTENT_BUCKET.delete(existing.imageKey)
          : Promise.resolve();
      }),
    ]);
  }

  // Cached per request: detail pages call this once via generateMetadata
  // and again while rendering the page body, and it'd otherwise mean two
  // round trips to KV for the same item on every visit.
  const get = cache(async (id: string): Promise<ContentItem | null> => {
    const { env } = await getCloudflareContext({ async: true });
    return (await env.CONTENT_KV.get<ContentItem>(itemKey(id), "json")) ?? null;
  });

  async function update(
    id: string,
    input: { title: string; description: string; imageKey?: string }
  ): Promise<ContentItem | null> {
    const { env } = await getCloudflareContext({ async: true });
    const existing = await env.CONTENT_KV.get<ContentItem>(itemKey(id), "json");
    if (!existing) return null;

    const updated: ContentItem = {
      ...existing,
      title: input.title,
      description: input.description,
      imageKey: input.imageKey ?? existing.imageKey,
    };

    await env.CONTENT_KV.put(itemKey(id), JSON.stringify(updated));
    if (input.imageKey && input.imageKey !== existing.imageKey) {
      await env.CONTENT_BUCKET.delete(existing.imageKey);
    }

    return updated;
  }

  return { list, create, remove, removeMany, get, update };
}
