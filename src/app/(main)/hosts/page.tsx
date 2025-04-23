"use client";

import dynamic from "next/dynamic";

const PersonInfo = dynamic(() => import("@heuvera/components/profile/hosts/MyAccount"));

export default function MyAccount() {

  return (
    <PersonInfo />
  );
}
