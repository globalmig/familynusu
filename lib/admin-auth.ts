import { cookies } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const ADMIN_COOKIE_NAME = "admin_session";

function bufferToHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(value: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value)
  );
  return bufferToHex(digest);
}

export async function verifyPassword(password: string) {
  const { env } = await getCloudflareContext({ async: true });
  return Boolean(env.ADMIN_PASSWORD) && password === env.ADMIN_PASSWORD;
}

export async function createSessionToken() {
  const { env } = await getCloudflareContext({ async: true });
  return sign(env.ADMIN_PASSWORD);
}

export async function isAuthenticated() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  const expected = await createSessionToken();
  return token === expected;
}
