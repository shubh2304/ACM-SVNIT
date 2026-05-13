import type { Metadata } from "next";
import AchievementsPage from "./AchievementsPage";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Awards, recognitions, and competition victories earned by SVNIT ACM Student Chapter.",
};

export default function Page() {
  return <AchievementsPage />;
}
