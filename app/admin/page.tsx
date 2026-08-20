import type { Metadata } from "next";
import AdminDashboard from "@/components/AdminDashboard";
import AdminLogin from "@/components/AdminLogin";
import { isAuthenticated } from "@/lib/admin-auth";
import { listCases } from "@/lib/cases";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    return <AdminLogin />;
  }

  const cases = await listCases();
  return <AdminDashboard initialCases={cases} />;
}
