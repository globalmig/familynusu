import type { Metadata } from "next";
import AdminLogin from "@/components/AdminLogin";
import AdminPanel from "@/components/AdminPanel";
import { isAuthenticated } from "@/lib/admin-auth";
import { casesStore } from "@/lib/content";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    return <AdminLogin />;
  }

  const cases = await casesStore.list();

  return <AdminPanel initialCases={cases} />;
}
