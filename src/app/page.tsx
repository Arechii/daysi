import { SignInButton } from "@clerk/nextjs";
import { LogInIcon } from "lucide-react";
import TypeAnim from "~/components/type-anim";
import { Button } from "~/components/ui/button";

export const runtime = "edge";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 ">
        <h1 className=" text-5xl font-extrabold tracking-tight text-rose-400 sm:text-[5rem]">
          Daysi
        </h1>
        <h2 className="text-3xl tracking-wide">
          Remember the last time you <br /> <TypeAnim />
        </h2>
        <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mr-2 h-4 w-4" /> Sign up
          </Button>
        </SignInButton>
      </div>
    </main>
  );
}
