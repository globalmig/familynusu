// Secrets are provided via .dev.vars locally and `wrangler secret put` in
// production; neither is present on the build machine, so `wrangler types`
// can't discover their names there. Declare them here so CloudflareEnv stays
// correct regardless of what's generated into env.d.ts.
interface CloudflareEnv {
	SOLAPI_API_KEY: string;
	SOLAPI_API_SECRET: string;
	SOLAPI_SENDER: string;
	ADMIN_PASSWORD: string;
}
