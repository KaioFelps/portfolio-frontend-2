import type { Metadata } from "next";
import { MetaUtilities } from "@/utils/meta";
import { LogsSection } from "./logs";
import { StatisticsSection } from "./statistics";

export const metadata: Metadata = {
  title: await MetaUtilities.getTitle("Home", true),
};

export default function AdminHomePage() {
  return (
    <>
      <StatisticsSection />
      <LogsSection />
    </>
  );
}
