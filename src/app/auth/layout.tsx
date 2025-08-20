"use client";

import { useAuth } from "@/hooks/useAuth";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <div>
      <p>User: {user?.name}</p>
      {children}
    </div>
  );
}
