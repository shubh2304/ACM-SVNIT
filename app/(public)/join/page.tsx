import type { Metadata } from "next";
import JoinPage from "./JoinPage";

export const metadata: Metadata = {
  title: "Join SVNIT ACM",
  description: "Become a member of SVNIT ACM Student Chapter. Apply to join and be part of the best tech community at NIT Surat.",
};

export default function Page() {
  return <JoinPage />;
}
