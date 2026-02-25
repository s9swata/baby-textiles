"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            Textile Heritage
          </h1>
        </Link>

        <div className="hidden md:block w-80">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <Input
              placeholder="Search sarees, dhotis..."
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
          href="/dhotis"
          className="text-sm font-medium text-text-main hover:text-primary transition-colors"
        >
          Dhotis
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
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-white" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
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
