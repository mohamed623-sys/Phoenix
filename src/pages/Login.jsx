import React from "react";
import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn path="/login" routing="path" signUpUrl="/signup" />
    </div>
  );
}
