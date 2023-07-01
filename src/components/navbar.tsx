"use client";

import { SignInButton } from "@clerk/nextjs";
import { type User } from "@clerk/nextjs/dist/types/server";
import { LogInIcon } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";
import UserButton from "./user-button";

const Navbar = ({
  username,
  profileImageUrl,
}: Partial<Pick<User, "username" | "profileImageUrl">>) => {
  return (
    <div className="flex w-screen flex-row-reverse gap-2 p-4">
      {username ? (
        <UserButton
          username={username}
          profileImageUrl={profileImageUrl ?? ""}
        />
      ) : (
        <SignInButton>
          <Button variant="outline" size="icon">
            <LogInIcon className="h-6 w-6" />
          </Button>
        </SignInButton>
      )}
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
