import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4 py-12">
      <SignUp 
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
