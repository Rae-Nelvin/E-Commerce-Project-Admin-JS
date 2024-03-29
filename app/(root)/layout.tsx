import React from "react";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

async function SetupLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}

export default SetupLayout;
