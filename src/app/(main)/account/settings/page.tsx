"use client";

import GeneralSettings from "@heuvera/components/settings/GeneralSettings";
import { useTheme } from "@heuvera/hooks/ThemeContext";

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
