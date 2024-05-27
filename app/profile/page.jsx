"use client";

import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  return (
    <>
      <h2 className="flex flex-col text-xs sm:text-xl font-semibold gap-5 ml-5 my-7">
        <span>Welcome, {profileName}</span>
        <span>Email: {profileEmail}</span>
      </h2>
    </>
  );
}
