"use client";

import { useTheme } from "@heuvera/hooks/ThemeContext";
import dynamic from "next/dynamic";

const GeneralSettings = dynamic(
  () => import("@heuvera/components/settings/GeneralSettings"),
);

export default function GeneralSettingsPage() {
  const { setTheme } = useTheme();

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
  };

  return (
    <div className="py-0 md:py-8">
      <GeneralSettings onThemeChange={handleThemeChange} />
    </div>
  );
}
