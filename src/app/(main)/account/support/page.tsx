"use client";

import dynamic from "next/dynamic";

const SupportsAssistance = dynamic(() => import("@heuvera/components/profile/guests/Supports&Assistance"));

export default function Support() {

  return (
    <SupportsAssistance />
  );
}
