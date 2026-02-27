"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Truck, BadgeCheck, RotateCcw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { products } from "@baby-textiles/schemas";

type SortOption = "featured" | "price-low" | "price-high" | "newest";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

export default function HomeLinenPage() {
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const sortedProducts = [...products.bedLinen].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return 0;
      default:
        return 0;
    }
  });

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10 py-6 flex flex-col gap-8">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Link href="/" className="text-stone-500 hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRightIcon className="h-4 w-4 text-stone-400" />
        <Link href="/home-linen" className="text-stone-500 hover:text-primary transition-colors">
          Home Linen
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative w-full rounded-2xl overflow-hidden min-h-[480px] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center">
          <Image
            alt="Luxurious bright bedroom with white cotton bedsheets and sunlight"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzp3SoHZnlWJVwiZqtbbAxFjHIcW2uMFX0QLcbNSZrHhiCRHDXVlZIzbnc14jI3V4Un4lz62ULWY1vFQ_LMpbfZ3OkImPlPD-mDV7vgBIdBRkXou-y4SsT9R0UwjiPWU_KgtL4GBJWe1r5ngC_bkH0xCjtv5PdWZsnW2Z6yat5YEi9HG1emXXTJGhS0an7aKbB00dExBZEj974998NTlYoY_U5dQTLFeLCznLOwrX0LFxjj5h8bVuzQWJ9VrmNDdspnPgLVoh7tg"
            fill
            className="object-cover"
            unoptimized
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 p-8 md:p-16 max-w-2xl flex flex-col gap-6">
          <Badge variant="new" className="w-fit">New Collection</Badge>
          <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
            Experience the Comfort of Pure Cotton
          </h1>
          <p className="text-gray-100 text-lg md:text-xl font-light leading-relaxed max-w-lg">
            Handwoven luxury for your bedroom sanctuary. Our breathable, 400-thread
            count sheets get softer with every wash.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="#products">
              <Button size="xl" className="gap-2">
                Shop the Collection
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div id="products" className="py-12 border-t border-stone-200">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-stone-900 text-2xl font-bold">Our Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-stone-500 hidden md:block">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-white border border-stone-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-stone-700 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              image={product.image}
              colors={product.colors}
              badge={product.badge}
              href={product.href}
            />
          ))}
        </div>
      </div>

      {/* Trust Section */}
      <div className="my-8 rounded-2xl bg-stone-100 p-8 md:p-12 text-center">
        <div className="max-w-3xl mx-auto flex flex-col gap-6 items-center">
          <span className="text-primary font-bold tracking-wider uppercase text-sm">
            Why Choose TextileCo?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
            Crafted for the perfect sleep
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-6">
            <div className="flex flex-col items-center gap-3">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">Free Shipping</h3>
              <p className="text-sm text-stone-500">
                On all orders above ₹999 across India
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">100% Authentic Cotton</h3>
              <p className="text-sm text-stone-500">
                Sourced directly from weavers
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <RotateCcw className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">Easy Returns</h3>
              <p className="text-sm text-stone-500">
                30-day hassle-free return policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
