import { SignInButton, UserButton } from "@clerk/nextjs";
import { type User } from "@clerk/nextjs/dist/types/server";
import { LogInIcon } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = ({ user }: { user: User | null }) => {
  return (
    <div className="flex w-screen flex-row-reverse p-4">
      {user ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <SignInButton>
          <Button variant="outline" size="icon">
            <LogInIcon className="h-5 w-5" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Navbar;
