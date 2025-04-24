"use client";

import {
  Moon,
  Sun,
  Laptop,
  Globe,
  Bell,
  ShieldCheck,
  UserCog,
  Check,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@heuvera/components/ui/button";
import AccountHeader from "../ui/AccountHeader";
import SettingsHeader from "../header/SettingsHeader";
import { ButtonAnimation } from "../animations/anim";

type ThemeOption = "light" | "dark" | "system";
type LanguageOption = "en-US" | "fr-FR" | "es-ES" | "de-DE" | "zh-CN";

interface NotificationPreference {
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
}

interface PrivacySettings {
  profileVisibility: "public" | "private" | "friends";
  dataSharing: boolean;
  twoFactorAuth: boolean;
}

interface GeneralSettingsProps {
  onThemeChange?: (theme: ThemeOption) => void;
  initialTheme?: ThemeOption;
  initialLanguage?: LanguageOption;
}

export default function GeneralSettings({
  onThemeChange,
  initialTheme = "system",
  initialLanguage = "en-US",
}: GeneralSettingsProps) {
  const [activeTheme, setActiveTheme] = useState<ThemeOption>(initialTheme);
  const [language, setLanguage] = useState<LanguageOption>(initialLanguage);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] =
    useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [notificationPreferences, setNotificationPreferences] =
    useState<NotificationPreference>({
      email: true,
      push: true,
      sms: false,
      inApp: true,
    });
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisibility: "public",
    dataSharing: true,
    twoFactorAuth: false,
  });
  const [changesSaved, setChangesSaved] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const handleThemeChange = (theme: ThemeOption) => {
    setActiveTheme(theme);
    if (onThemeChange) {
      onThemeChange(theme);
    }
    setChangesSaved(false);
  };

  const handleLanguageChange = (lang: LanguageOption) => {
    setLanguage(lang);
    setShowLanguageOptions(false);
    setChangesSaved(false);
  };

  const toggleNotificationPreference = (key: keyof NotificationPreference) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setChangesSaved(false);
  };

  const togglePrivacySetting = (key: keyof PrivacySettings) => {
    if (typeof privacySettings[key] === "boolean") {
      setPrivacySettings((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
      setChangesSaved(false);
    }
  };

  const setProfileVisibility = (
    visibility: "public" | "private" | "friends",
  ) => {
    setPrivacySettings((prev) => ({
      ...prev,
      profileVisibility: visibility,
    }));
    setChangesSaved(false);
  };

  const saveChanges = () => {
    
    console.log({
      theme: activeTheme,
      language,
      notificationPreferences,
      privacySettings,
    });

    setChangesSaved(true);

    // Reset the saved indicator after 3 seconds
    setTimeout(() => {
      setChangesSaved(false);
    }, 3000);
  };

  const getLanguageLabel = (code: LanguageOption) => {
    const labels: Record<LanguageOption, string> = {
      "en-US": "English (US)",
      "fr-FR": "Français",
      "es-ES": "Español",
      "de-DE": "Deutsch",
      "zh-CN": "中文",
    };
    return labels[code];
  };

  const [isHelpVisible, setIsHelpVisible] = useState(false);

  const toggleHelp = () => {
    setIsHelpVisible(!isHelpVisible);
  };

  return (
    <motion.div
      className="flex flex-col justify-start gap-5 w-full pr-0 md:pr-5 pb-32 md:pb-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <SettingsHeader
        heading="General Settings"
        subheading="Manage your application preferences and appearance"
      />
      {/* Theme Settings */}
      <motion.div className="pb-5 border-b" variants={itemVariants}>
        <div className="flex mt-0 md:mt-5 gap-3 md:gap-3 lg:gap-0 flex-col md:flex-col lg:flex-row justify-between">
          <div>
            <h2 className="text-[1.25rem] font-normal">Theme Preferences</h2>
            <p className="text-[#898989] dark:text-[#666666] text-sm md:text-base lg:text-xs xl:text-base">
              Choose how the application appears to you
            </p>
          </div>

          <div className="flex space-x-3 mt-4 lg:mt-0">
            <motion.div variants={ButtonAnimation}>
              <Button
                variant={activeTheme === "light" ? "default" : "outline"}
                className={`px-3 md:px-4 text-xs md:text-sm lg:text-xs xl:text-sm flex items-center gap-2 ${
                  activeTheme === "light"
                    ? "bg-[#7B4F3A] dark:bg-[#8B5F4D] hover:bg-[#664130] text-white"
                    : ""
                }`}
                onClick={() => handleThemeChange("light")}
              >
                <Sun size={16} />
                Light
              </Button>
            </motion.div>

            <motion.div variants={ButtonAnimation}>
              <Button
                variant={activeTheme === "dark" ? "default" : "outline"}
                className={`px-3 md:px-4 text-xs md:text-sm lg:text-xs xl:text-sm flex items-center gap-2 ${
                  activeTheme === "dark"
                    ? "bg-[#7B4F3A] dark:bg-[#8B5F4D] hover:bg-[#664130] text-white"
                    : ""
                }`}
                onClick={() => handleThemeChange("dark")}
              >
                <Moon size={16} />
                Dark
              </Button>
            </motion.div>

            <motion.div variants={ButtonAnimation}>
              <Button
                variant={activeTheme === "system" ? "default" : "outline"}
                className={`px-3 md:px-4 text-xs md:text-sm lg:text-xs xl:text-sm flex items-center gap-2 ${
                  activeTheme === "system"
                    ? "bg-[#7B4F3A] dark:bg-[#8B5F4D] hover:bg-[#664130] text-white"
                    : ""
                }`}
                onClick={() => handleThemeChange("system")}
              >
                <Laptop size={16} />
                System
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Language Settings */}
      <motion.div className="pb-5 border-b" variants={itemVariants}>
        <div className="flex mt-5 gap-3 md:gap-3 lg:gap-0 flex-col md:flex-col lg:flex-row justify-between">
          <div>
            <h2 className="text-[1.25rem] font-normal ">Language</h2>
            <p className="text-[#898989] dark:text-[#666666] text-sm md:text-base lg:text-xs xl:text-base">
              Select your preferred language
            </p>
          </div>

          <div className="flex flex-col space-y-3 mt-4 lg:mt-0">
            <div className="flex space-x-3">
              <motion.div
                variants={ButtonAnimation}
              >
                <Button
                  variant="outline"
                  className="px-3 md:px-4 text-xs md:text-sm lg:text-xs xl:text-sm flex items-center gap-2"
                >
                  <Globe size={16} />
                  {getLanguageLabel(language)}
                </Button>
              </motion.div>

              <motion.div
                variants={ButtonAnimation}
              >
                <Button
                  variant="outline"
                  className="px-3 md:px-4 text-xs md:text-sm lg:text-xs xl:text-sm"
                  onClick={() => setShowLanguageOptions(!showLanguageOptions)}
                >
                  {showLanguageOptions ? "Hide Options" : "Change Language"}
                </Button>
              </motion.div>
            </div>

            {showLanguageOptions && (
              <motion.div
                className="flex flex-col space-y-2 p-3 border rounded-md bg-[#F8F7F2] dark:bg-[#333333]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {(
                  [
                    "en-US",
                    "fr-FR",
                    "es-ES",
                    "de-DE",
                    "zh-CN",
                  ] as LanguageOption[]
                ).map((lang) => (
                  <Button
                    key={lang}
                    variant="ghost"
                    className={`justify-start ${language === lang ? "font-medium text-[#7B4F3A] dark:text-[#8B5F4D] dark:hover:text-[#F8F7F2]" : "dark:hover:text-[#F8F7F2]"}`}
                    onClick={() => handleLanguageChange(lang)}
                  >
                    {language === lang && <Check size={14} className="mr-2" />}
                    {getLanguageLabel(lang)}
                  </Button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div className="pb-5 border-b" variants={itemVariants}>
        <div className="flex mt-5 gap-3 md:gap-3 lg:gap-0 flex-col md:flex-col lg:flex-row justify-between">
          <div>
            <h2 className="text-[1.25rem] text-[#333333] dark:text-[#F8F7F2] font-normal flex items-center gap-2">
              <Bell size={20} /> Notification Preferences
            </h2>
            <p className="text-[#898989] dark:text-[#666666] text-sm md:text-base lg:text-xs xl:text-base">
              Manage when and how you receive notifications
            </p>
          </div>

          <div className="flex space-x-3 mt-4 lg:mt-0">
            <motion.div variants={ButtonAnimation}>
              <Button
                variant="outline"
                className="px-3 md:px-4 text-xs md:text-sm lg:text-xs xl:text-sm"
                onClick={() =>
                  setShowNotificationSettings(!showNotificationSettings)
                }
              >
                {showNotificationSettings ? "Hide Options" : "Configure"}
              </Button>
            </motion.div>
          </div>
        </div>

        {showNotificationSettings && (
          <motion.div
            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-[#444444] rounded-md">
              <div>
                <h3 className="font-medium text-[#333333] dark:text-[#F8F7F2]">Email Notifications</h3>
                <p className="text-xs text-[#A7A7A7]">
                  Receive updates via email
                </p>
              </div>
              <Button
                variant={notificationPreferences.email ? "default" : "outline"}
                size="sm"
                className={
                  notificationPreferences.email ? "bg-[#7B4F3A] text-white" : ""
                }
                onClick={() => toggleNotificationPreference("email")}
              >
                {notificationPreferences.email ? "Enabled" : "Disabled"}
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-[#444444] rounded-md">
              <div>
                <h3 className="font-medium text-[#333333] dark:text-[#F8F7F2]">Push Notifications</h3>
                <p className="text-xs text-[#A7A7A7]">
                  Notifications on your device
                </p>
              </div>
              <Button
                variant={notificationPreferences.push ? "default" : "outline"}
                size="sm"
                className={
                  notificationPreferences.push ? "bg-[#7B4F3A] text-white" : ""
                }
                onClick={() => toggleNotificationPreference("push")}
              >
                {notificationPreferences.push ? "Enabled" : "Disabled"}
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-[#444444] rounded-md">
              <div>
                <h3 className="font-medium text-[#333333] dark:text-[#F8F7F2]">SMS Notifications</h3>
                <p className="text-xs text-[#A7A7A7]">Receive text messages</p>
              </div>
              <Button
                variant={notificationPreferences.sms ? "default" : "outline"}
                size="sm"
                className={
                  notificationPreferences.sms ? "bg-[#7B4F3A] text-white" : ""
                }
                onClick={() => toggleNotificationPreference("sms")}
              >
                {notificationPreferences.sms ? "Enabled" : "Disabled"}
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-[#444444] rounded-md">
              <div>
                <h3 className="font-medium text-[#333333] dark:text-[#F8F7F2]">In-App Notifications</h3>
                <p className="text-xs text-[#A7A7A7]">
                  Notifications inside the app
                </p>
              </div>
              <Button
                variant={notificationPreferences.inApp ? "default" : "outline"}
                size="sm"
                className={
                  notificationPreferences.inApp ? "bg-[#7B4F3A] text-white" : ""
                }
                onClick={() => toggleNotificationPreference("inApp")}
              >
                {notificationPreferences.inApp ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Privacy Settings */}
      <motion.div className="pb-5 border-b" variants={itemVariants}>
        <div className="flex mt-5 gap-3 md:gap-3 lg:gap-0 flex-col md:flex-col lg:flex-row justify-between">
          <div>
            <h2 className="text-[1.25rem] font-normal text-[#333333] dark:text-[#F8F7F2] flex items-center gap-2">
              <ShieldCheck size={20} /> Privacy & Security
            </h2>
            <p className="text-[#898989] dark:text-[#666666] text-sm md:text-base lg:text-xs xl:text-base">
              Control your data sharing and security preferences
            </p>
          </div>

          <div className="flex space-x-3 mt-4 lg:mt-0">
            <motion.div variants={ButtonAnimation}>
              <Button
                variant="outline"
                className="px-3 md:px-4 text-xs md:text-sm lg:text-xs xl:text-sm"
                onClick={() => setShowPrivacySettings(!showPrivacySettings)}
              >
                {showPrivacySettings ? "Hide Settings" : "Manage Settings"}
              </Button>
            </motion.div>
          </div>
        </div>

        {showPrivacySettings && (
          <motion.div
            className="mt-4 flex flex-col space-y-4 p-4 border rounded-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div>
              <h3 className="font-medium mb-2 text-[#333333] dark:text-[#F8F7F2]">Profile Visibility</h3>
              <div className="flex space-x-3">
                <Button
                  variant={
                    privacySettings.profileVisibility === "public"
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  className={
                    privacySettings.profileVisibility === "public"
                      ? "bg-[#7B4F3A] text-white"
                      : ""
                  }
                  onClick={() => setProfileVisibility("public")}
                >
                  Public
                </Button>
                <Button
                  variant={
                    privacySettings.profileVisibility === "friends"
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  className={
                    privacySettings.profileVisibility === "friends"
                      ? "bg-[#7B4F3A] text-white"
                      : ""
                  }
                  onClick={() => setProfileVisibility("friends")}
                >
                  Friends Only
                </Button>
                <Button
                  variant={
                    privacySettings.profileVisibility === "private"
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  className={
                    privacySettings.profileVisibility === "private"
                      ? "bg-[#7B4F3A] text-white"
                      : ""
                  }
                  onClick={() => setProfileVisibility("private")}
                >
                  Private
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-[#444444] rounded">
              <div>
                <h3 className="font-medium text-[#333333] dark:text-[#F8F7F2]">Data Sharing</h3>
                <p className="text-xs text-[#A7A7A7]">
                  Allow anonymous usage data to improve services
                </p>
              </div>
              <Button
                variant={privacySettings.dataSharing ? "default" : "outline"}
                size="sm"
                className={
                  privacySettings.dataSharing ? "bg-[#7B4F3A] text-white" : ""
                }
                onClick={() => togglePrivacySetting("dataSharing")}
              >
                {privacySettings.dataSharing ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-[#444444] rounded">
              <div>
                <h3 className="font-medium text-[#333333] dark:text-[#F8F7F2]">Two-Factor Authentication</h3>
                <p className="text-xs text-[#A7A7A7]">
                  Add extra security to your account
                </p>
              </div>
              <Button
                variant={privacySettings.twoFactorAuth ? "default" : "outline"}
                size="sm"
                className={
                  privacySettings.twoFactorAuth ? "bg-[#7B4F3A] text-white" : ""
                }
                onClick={() => togglePrivacySetting("twoFactorAuth")}
              >
                {privacySettings.twoFactorAuth ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Account Settings & Save Button */}
      <motion.div className="pb-5 border-b" variants={itemVariants}>
        <div className="flex mt-5 gap-3 md:gap-3 lg:gap-0 flex-col md:flex-col lg:flex-row justify-between">
          <div>
            <h2 className="text-[1.25rem] font-normal text-[#333333] dark:text-[#F8F7F2] flex items-center gap-2">
              <UserCog size={20} /> Account Preferences
            </h2>
            <p className="text-[#898989] dark:text-[#666666] text-sm md:text-base lg:text-xs xl:text-base">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            {changesSaved && (
              <motion.span
                className="text-[#3E8E41] dark:text-[#34C759] flex items-center text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Check size={16} className="mr-1" /> Changes saved!
              </motion.span>
            )}
            <motion.div variants={ButtonAnimation}>
              <Button
                variant="default"
                className="bg-[#7B4F3A] dark:bg-[#8B5F4D] hover:bg-[#664130] text-white px-3 md:px-4 text-xs md:text-sm lg:text-xs xl:text-sm"
                onClick={saveChanges}
              >
                Save Changes
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
