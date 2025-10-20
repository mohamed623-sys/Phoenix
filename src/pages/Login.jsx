import React from "react";
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="max-w-md mx-auto py-16">
      <SignedIn>
        <div className="bg-white/5 p-6 rounded text-center">
          <p className="mb-4">You are signed in</p>
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <div className="bg-white/5 p-6 rounded">
          <SignIn routing="path" path="/login" />
        </div>
      </SignedOut>
    </div>
  );
}
