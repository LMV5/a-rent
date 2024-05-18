"use client";

import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  return (
    <>
      <h2 className="m-auto text-xl font-semibold mb-4 mt-4 flex gap-5">
        <span>Welcome, {profileName}</span>
        <span className="block">Email: {profileEmail}</span>
      </h2>
    </>
  );
}
