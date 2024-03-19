"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import qs from "query-string";
import { SignInButton } from "@clerk/nextjs";

export const AuthButtons = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleRedirectToAuthPage = (path: "/sign-in" | "/sign-up") => {
    const currentQuery = qs.parse(searchParams.toString());
    const url = qs.stringifyUrl(
      {
        url: path,
        query: {
          redirect_url: pathname,
          ...currentQuery,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="flex gap-3">
      <Button onClick={() => handleRedirectToAuthPage("/sign-in")} size="sm">
        Sign in
      </Button>
      <Button
        onClick={() => handleRedirectToAuthPage("/sign-up")}
        size="sm"
        variant="outline"
        className="hidden sm:block"
      >
        Register
      </Button>
    </div>
  );
};
