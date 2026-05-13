import type { Metadata } from "next";
import BlogsPage from "./BlogsPage";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, tutorials, event recaps, and tech articles from the SVNIT ACM community.",
};

export default function Page() {
  return <BlogsPage />;
}
