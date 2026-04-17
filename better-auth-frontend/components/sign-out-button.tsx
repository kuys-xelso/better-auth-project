"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SignOutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => setIsPending(true),
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
        onError: (ctx) => {
          alert(ctx.error.message);
          setIsPending(false);
        },
      },
    });
  };

  return (
    <Button variant="destructive" onClick={handleSignOut} disabled={isPending}>
      {isPending ? "Signing out..." : "Sign out"}
    </Button>
  );
}
