import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <SignIn 
        appearance={{
          elements: {
            rootBox: {
              width: "100%",
              maxWidth: "400px",
            },
          },
        }}
      />
    </div>
  );
}
