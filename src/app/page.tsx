import { currentUser, SignInButton, SignOutButton } from "@clerk/nextjs";

export const runtime = "edge";

export default async function Home() {
  const user = await currentUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="tracking-tigh text-5xl font-extrabold text-rose-400 sm:text-[5rem]">
          Daysi
        </h1>
        {user ? <SignOutButton /> : <SignInButton />}
      </div>
    </main>
  );
}
