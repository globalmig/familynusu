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
    const { env } = await getCloudflareContext({ async: true });
    const existing = await env.CONTENT_KV.get<ContentItem>(itemKey(id), "json");
    const ids = (await env.CONTENT_KV.get<string[]>(indexKey, "json")) ?? [];
    const nextIds = ids.filter((existingId) => existingId !== id);

    await Promise.all([
      env.CONTENT_KV.delete(itemKey(id)),
      env.CONTENT_KV.put(indexKey, JSON.stringify(nextIds)),
      existing
        ? env.CONTENT_BUCKET.delete(existing.imageKey)
        : Promise.resolve(),
    ]);
  }

  return { list, create, remove };
}
