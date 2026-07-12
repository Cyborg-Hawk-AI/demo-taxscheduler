import type { Metadata } from "next";
import DemoApp from "@/components/demo/DemoApp";

export const metadata: Metadata = {
  title: "Live Demo — TaxScheduler",
  description:
    "Interactive demo of TaxScheduler: booking page, document Kanban, automated nudges, and season dashboard.",
};

export default function DemoPage() {
  return <DemoApp />;
}
