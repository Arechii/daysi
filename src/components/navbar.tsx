import { SignInButton, UserButton } from "@clerk/nextjs";
import { type User } from "@clerk/nextjs/dist/types/server";
import { LogInIcon } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";

const Navbar = ({ user }: { user: User | null }) => {
  return (
    <div className="flex w-screen flex-row-reverse gap-2 p-4">
      {user ? (
        <UserButton afterSignOutUrl="/" />
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
