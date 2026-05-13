import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about SVNIT ACM Student Chapter — our story, mission, vision, and the team that drives innovation at NIT Surat.",
};

export default function Page() {
  return <AboutPage />;
}
