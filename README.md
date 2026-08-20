This is a [Next.js](https://nextjs.org) project, deployed on **Cloudflare Workers** via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare).

## Getting Started (local dev)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Local dev automatically emulates the Cloudflare KV/R2 bindings (via `.dev.vars`), so the 작업사례 admin feature works without any live Cloudflare resources.

## 작업사례(admin) 기능

- `/admin` — 비밀번호로 로그인하면 사진+글로 작업사례를 등록/삭제할 수 있는 관리자 페이지입니다.
- 로그인 비밀번호는 `ADMIN_PASSWORD` 환경변수입니다. 로컬 개발용 값은 `.env.local` / `.dev.vars`에 있습니다. **배포 전 반드시 변경**하고, 대표님께 안전하게 전달해주세요.
- 등록된 사진은 Cloudflare R2에, 제목/설명은 Cloudflare KV에 저장됩니다. 홈페이지 "작업 분야" 섹션은 등록된 사례가 있으면 그것을 보여주고, 없으면 기존 예시 이미지를 보여줍니다.

## Cloudflare 배포 준비 (최초 1회)

1. Cloudflare 계정으로 로그인:
   ```bash
   npx wrangler login
   ```
2. KV 네임스페이스와 R2 버킷 생성:
   ```bash
   npx wrangler kv namespace create familynusu-cases
   npx wrangler r2 bucket create familynusu-cases
   ```
   `kv namespace create` 실행 결과로 나오는 `id`를 `wrangler.jsonc`의 `kv_namespaces[0].id`에 넣어주세요.
3. 프로덕션 시크릿 등록 (SMS 발송 키, 관리자 비밀번호):
   ```bash
   npx wrangler secret put SOLAPI_API_KEY
   npx wrangler secret put SOLAPI_API_SECRET
   npx wrangler secret put SOLAPI_SENDER
   npx wrangler secret put ADMIN_PASSWORD
   ```

## 배포

```bash
npm run deploy    # 빌드 후 Cloudflare Workers에 배포
npm run preview   # 배포 전, 로컬에서 프로덕션 빌드를 미리 확인
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare)
- [Cloudflare Workers docs](https://developers.cloudflare.com/workers/)
