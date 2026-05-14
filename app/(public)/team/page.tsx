import type { Metadata } from "next";
import TeamPage from "./TeamPage";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the ACM SVNIT team — past and present leaders, core members, and the people who make it all happen.",
};

export default function Page() {
  return <TeamPage />;
}
