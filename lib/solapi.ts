import { SolapiMessageService } from "solapi";

let service: SolapiMessageService | null = null;

function getService() {
  if (!service) {
    const apiKey = process.env.SOLAPI_API_KEY;
    const apiSecret = process.env.SOLAPI_API_SECRET;
    if (!apiKey || !apiSecret) {
      throw new Error(
        "SOLAPI_API_KEY, SOLAPI_API_SECRET 환경변수가 설정되지 않았습니다."
      );
    }
    service = new SolapiMessageService(apiKey, apiSecret);
  }
  return service;
}

export async function sendSms(to: string, text: string) {
  const from = process.env.SOLAPI_SENDER;
  if (!from) {
    throw new Error("SOLAPI_SENDER 환경변수가 설정되지 않았습니다.");
  }

  return getService().send({
    to: to.replace(/[^0-9]/g, ""),
    from: from.replace(/[^0-9]/g, ""),
    text,
  });
}
