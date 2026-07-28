import { NextResponse } from "next/server";
import { sendSms } from "@/lib/solapi";
import { site } from "@/lib/site-config";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const { name, contact, region, message } = body as Record<string, string>;

  if (!name || !contact || !region || !message) {
    return NextResponse.json(
      { error: "필수 항목이 누락되었습니다." },
      { status: 400 }
    );
  }

  const text = `[무료 상담 신청]\n성함: ${name}\n연락처: ${contact}\n지역: ${region}\n문의내용: ${message}`;

  try {
    await sendSms(site.phone, text);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Solapi SMS 발송 실패:", error);
    return NextResponse.json(
      { error: "문자 발송에 실패했습니다." },
      { status: 500 }
    );
  }
}
