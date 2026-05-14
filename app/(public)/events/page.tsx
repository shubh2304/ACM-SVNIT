import type { Metadata } from "next";
import EventsPage from "./EventsPage";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past events from ACM SVNIT — hackathons, workshops, talks, and competitions.",
};

export default function Page() {
  return <EventsPage />;
}
