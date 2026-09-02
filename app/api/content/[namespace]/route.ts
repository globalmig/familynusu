import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { isAuthenticated } from "@/lib/admin-auth";
import { getContentStore } from "@/lib/content";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

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
  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "이미지 파일만 업로드할 수 있습니다." },
      { status: 400 }
    );
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json(
      { error: "이미지 용량은 8MB 이하여야 합니다." },
      { status: 400 }
    );
  }

  const { env } = await getCloudflareContext({ async: true });
  const ext = (file.type.split("/")[1] || "jpg").replace(/[^a-z0-9]/gi, "");
  const imageKey = `${namespace}-${crypto.randomUUID()}.${ext}`;

  await env.CONTENT_BUCKET.put(imageKey, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type },
  });

  const item = await store.create({
    title: title.trim(),
    description: typeof description === "string" ? description.trim() : "",
    imageKey,
  });

  return NextResponse.json({ item }, { status: 201 });
}
