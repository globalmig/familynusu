import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { isAuthenticated } from "@/lib/admin-auth";
import { getContentStore } from "@/lib/content";
import { ImageValidationError, storeUploadedImage } from "@/lib/media";

export async function PATCH(
  request: Request,
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

  let imageKey: string | undefined;
  if (file instanceof File && file.size > 0) {
    const { env } = await getCloudflareContext({ async: true });
    try {
      imageKey = await storeUploadedImage(namespace, file, env.CONTENT_BUCKET);
    } catch (err) {
      if (err instanceof ImageValidationError) {
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
      throw err;
    }
  }

  const item = await store.update(id, {
    title: title.trim(),
    description: typeof description === "string" ? description.trim() : "",
    imageKey,
  });

  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ item });
}

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
