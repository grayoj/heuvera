"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSession } from "@auth0/nextjs-auth0";

export function useAuthClient() {
  const { user, error, isLoading } = useUser();
  return { user, error, isLoading, isAuthenticated: !!user };
}

export async function useAuthServer() {
  const session = await getSession();
  const user = session?.user;
  return {
    user,
    isAuthenticated: !!user,
  };
}
