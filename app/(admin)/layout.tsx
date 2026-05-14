import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Sidebar from "@/components/admin/Sidebar";
import AdminProviders from "./AdminProviders";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || "";
  console.log("HEADERS:", Object.fromEntries(headersList.entries()));
  const isLoginPage = pathname.includes("/admin/login");

  if (isLoginPage) {
    return (
      <AdminProviders>
        {children}
      </AdminProviders>
    );
  }

  const session = await auth();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminProviders>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </AdminProviders>
  );
}
