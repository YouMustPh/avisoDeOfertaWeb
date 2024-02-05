import { cookies } from "next/headers";
import LoginPage from "@/components/admin/loginPage";
import { AdminDrawer } from "@/components/admin/drawer";
import { clearCookie } from "@/lib/cookies";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();

  if (!cookieStore.has("token")) {
    return (
      <section className="flex h-full flex-col items-center justify-between p-24 ">
        <LoginPage />
      </section>
    );
  }

  return (
    <section className="w-screen">
      <div className="absolute left-0 top-1/2">
        <AdminDrawer />
      </div>
      {children}
    </section>
  );
}
