import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with ACM SVNIT Student Chapter — we'd love to hear from you.",
};

export default function Page() {
  return <ContactPage />;
}
