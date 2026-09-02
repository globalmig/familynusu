import { createContentStore } from "./content-store";

export const CONTENT_STORES = {
  cases: createContentStore("cases"),
} as const;

export type ContentNamespace = keyof typeof CONTENT_STORES;

export const casesStore = CONTENT_STORES.cases;

export function getContentStore(namespace: string) {
  if (namespace in CONTENT_STORES) {
    return CONTENT_STORES[namespace as ContentNamespace];
  }
  return null;
}
