import type { Metadata } from "next";
import JoinPage from "./JoinPage";

export const metadata: Metadata = {
  title: "Join ACM SVNIT",
  description: "Become a member of ACM SVNIT Student Chapter. Apply to join and be part of the best tech community at NIT Surat.",
};

export default function Page() {
  return <JoinPage />;
}
