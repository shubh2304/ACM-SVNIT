import { SessionProvider } from "next-auth/react";
import AdminLoginPage from "./LoginPage";

export default function Page() {
  return (
    <SessionProvider>
      <AdminLoginPage />
    </SessionProvider>
  );
}
