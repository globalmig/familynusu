import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { getContentStore } from "@/lib/content";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ namespace: string; id: string }> }
) {
  const { namespace, id } = await params;
  const store = getContentStore(namespace);
  if (!store) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  await store.remove(id);
  return NextResponse.json({ ok: true });
}
