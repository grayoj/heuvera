"use client";
import dynamic from "next/dynamic";

const PersonInfo = dynamic(() => import("@heuvera/components/profile/guests/MyAccount"));

export default function MyAccount() {

  return (
    <PersonInfo />
  );
}
