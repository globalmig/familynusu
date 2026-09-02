import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { isAuthenticated } from "@/lib/admin-auth";
import { getContentStore } from "@/lib/content";
import { ImageValidationError, storeUploadedImage } from "@/lib/media";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ namespace: string }> }
) {
  const { namespace } = await params;
  const store = getContentStore(namespace);
  if (!store) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const items = await store.list();
  return NextResponse.json({ items });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ namespace: string }> }
) {
  const { namespace } = await params;
  const store = getContentStore(namespace);
  if (!store) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const title = form.get("title");
  const description = form.get("description");
  const file = form.get("image");

  if (typeof title !== "string" || !title.trim()) {
    return NextResponse.json(
      { error: "제목을 입력해주세요." },
      { status: 400 }
    );
  }
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json(
      { error: "사진을 선택해주세요." },
      { status: 400 }
    );
  }

  const { env } = await getCloudflareContext({ async: true });

  let imageKey: string;
  try {
    imageKey = await storeUploadedImage(namespace, file, env.CONTENT_BUCKET);
  } catch (err) {
    if (err instanceof ImageValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }

  const item = await store.create({
    title: title.trim(),
    description: typeof description === "string" ? description.trim() : "",
    imageKey,
  });

  return NextResponse.json({ item }, { status: 201 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ namespace: string }> }
) {
  const { namespace } = await params;
  const store = getContentStore(namespace);
  if (!store) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    ids?: unknown;
  } | null;
  const ids = Array.isArray(body?.ids)
    ? body.ids.filter((id: unknown): id is string => typeof id === "string")
    : [];

  if (ids.length === 0) {
    return NextResponse.json(
      { error: "삭제할 항목을 선택해주세요." },
      { status: 400 }
    );
  }

  await store.removeMany(ids);
  return NextResponse.json({ ok: true });
}
