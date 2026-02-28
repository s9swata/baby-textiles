"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useCart } from "@/context/CartContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-neutral-light bg-background/95 backdrop-blur-sm px-6 py-4 lg:px-12">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-text-main hover:opacity-80 transition-opacity"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Diamond className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-text-main hidden sm:block">
            Baby Textiles
          </h1>
        </Link>

        <div className="hidden md:block w-80">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/80" />
            <Input
              placeholder="Search sarees..."
              className="pl-10 bg-neutral-light border-none"
            />
          </div>
        </div>
      </div>

      <nav className="hidden lg:flex items-center gap-8">
        <Link
          href="/sarees"
          className="text-sm font-medium text-text-main hover:text-primary transition-colors"
        >
          Sarees
        </Link>

        <Link
          href="/home-linen"
          className="text-sm font-medium text-text-main hover:text-primary transition-colors"
        >
          Home Linen
        </Link>
        <Link
          href="/about"
          className="text-sm font-medium text-text-main hover:text-primary transition-colors"
        >
          About Us
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Search className="h-5 w-5" />
        </Button>
        <Link href="/cart">
          <Button variant="ghost" size="icon" className="relative" asChild={false}>
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Button>
        </Link>
        
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </SignInButton>
        </SignedOut>
        
        <SignedIn>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "h-9 w-9"
              }
            }}
          />
        </SignedIn>
        
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
