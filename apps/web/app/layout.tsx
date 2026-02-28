import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ClerkWrapper } from "@/components/providers/clerk-wrapper";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";

const rethinkSans = Rethink_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Baby Textiles - Premium Indian Handlooms",
  description:
    "Explore our handcrafted collection of premium silk sarees woven with heritage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkWrapper>
      <html lang="en">
        <body className={`${rethinkSans.variable} antialiased`}>
          <CartProvider>
            <Toaster position="bottom-right" />
            <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </body>
      </html>
    </ClerkWrapper>
  );
}
