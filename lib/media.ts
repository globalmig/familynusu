const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

export class ImageValidationError extends Error {}

export async function storeUploadedImage(
  namespace: string,
  file: File,
  bucket: R2Bucket
): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new ImageValidationError("이미지 파일만 업로드할 수 있습니다.");
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new ImageValidationError("이미지 용량은 8MB 이하여야 합니다.");
  }

  const ext = (file.type.split("/")[1] || "jpg").replace(/[^a-z0-9]/gi, "");
  const imageKey = `${namespace}-${crypto.randomUUID()}.${ext}`;
  await bucket.put(imageKey, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type },
  });
  return imageKey;
}
