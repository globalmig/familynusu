import { getCloudflareContext } from "@opennextjs/cloudflare";

export type CaseItem = {
  id: string;
  title: string;
  description: string;
  imageKey: string;
  createdAt: string;
};

const INDEX_KEY = "cases:index";
const itemKey = (id: string) => `cases:item:${id}`;

export async function listCases(): Promise<CaseItem[]> {
  const { env } = await getCloudflareContext({ async: true });
  const ids = (await env.CASES_KV.get<string[]>(INDEX_KEY, "json")) ?? [];
  if (ids.length === 0) return [];

  const keys = ids.map(itemKey);
  const values = await env.CASES_KV.get<CaseItem>(keys, "json");
  return ids
    .map((id) => values.get(itemKey(id)))
    .filter((item): item is CaseItem => Boolean(item));
}

export async function createCase(input: {
  title: string;
  description: string;
  imageKey: string;
}): Promise<CaseItem> {
  const { env } = await getCloudflareContext({ async: true });
  const item: CaseItem = {
    id: crypto.randomUUID(),
    ...input,
    createdAt: new Date().toISOString(),
  };

  const ids = (await env.CASES_KV.get<string[]>(INDEX_KEY, "json")) ?? [];
  ids.unshift(item.id);

  await Promise.all([
    env.CASES_KV.put(itemKey(item.id), JSON.stringify(item)),
    env.CASES_KV.put(INDEX_KEY, JSON.stringify(ids)),
  ]);

  return item;
}

export async function deleteCase(id: string): Promise<void> {
  const { env } = await getCloudflareContext({ async: true });
  const existing = await env.CASES_KV.get<CaseItem>(itemKey(id), "json");
  const ids = (await env.CASES_KV.get<string[]>(INDEX_KEY, "json")) ?? [];
  const nextIds = ids.filter((existingId) => existingId !== id);

  await Promise.all([
    env.CASES_KV.delete(itemKey(id)),
    env.CASES_KV.put(INDEX_KEY, JSON.stringify(nextIds)),
    existing ? env.CASES_BUCKET.delete(existing.imageKey) : Promise.resolve(),
  ]);
}
