"use client";

import dynamic from "next/dynamic";

const GeneralSettingsPage = dynamic(
  () => import("@heuvera/components/profile/guests/GeneralSettings"),
);

export default function GeneralSettings() {
  return <GeneralSettingsPage />;
}
