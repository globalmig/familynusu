import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { deleteCase } from "@/lib/cases";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const { id } = await params;
  await deleteCase(id);
  return NextResponse.json({ ok: true });
}
