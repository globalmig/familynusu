import { createContentStore } from "./content-store";

export const CONTENT_STORES = {
  cases: createContentStore("cases"),
} as const;

export type ContentNamespace = keyof typeof CONTENT_STORES;

// Keep in sync with the slice size components/Cases.tsx uses on the homepage.
export const HOMEPAGE_PREVIEW_LIMIT = 6;

export const casesStore = CONTENT_STORES.cases;

export function getContentStore(namespace: string) {
  if (namespace in CONTENT_STORES) {
    return CONTENT_STORES[namespace as ContentNamespace];
  }
  return null;
}
