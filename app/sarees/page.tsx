"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ShoppingCart, Heart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { products, sareeCategories } from "@/lib/data";
import { useState } from "react";

interface SareeProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  image: string;
  colors?: string[];
  badge: string | null;
  href: string;
  category: string;
}

const priceRanges = [
  { id: "under1000", label: "Under ₹1,000" },
  { id: "1000-2000", label: "₹1,000 - ₹2,000" },
  { id: "2000-4000", label: "₹2,000 - ₹4,000" },
  { id: "4000plus", label: "₹4,000+" },
];

const colors = [
  { id: "red", color: "#dc2626" },
  { id: "blue", color: "#2563eb" },
  { id: "green", color: "#16a34a" },
  { id: "yellow", color: "#eab308" },
  { id: "purple", color: "#9333ea" },
  { id: "pink", color: "#ec4899" },
  { id: "black", color: "#000000" },
  { id: "white", color: "#ffffff" },
];

export default function SareesPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = selectedCategory === "all"
    ? products.sarees
    : products.sarees.filter((p: SareeProduct) => 
        p.category.toLowerCase().replace(" ", "-") === selectedCategory
      );

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return products.sarees.length;
    return products.sarees.filter((p: SareeProduct) => 
      p.category.toLowerCase().replace(" ", "-") === categoryId
    ).length;
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10 py-8">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 mb-6 text-sm">
        <Link href="/" className="text-stone-500 hover:text-primary transition-colors">
          Home
        </Link>
        <span className="text-stone-300">/</span>
        <Link href="#" className="text-stone-500 hover:text-primary transition-colors">
          Collections
        </Link>
        <span className="text-stone-300">/</span>
        <span className="text-stone-900 font-medium">Sarees</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2">
            Elegant Saree Collection
          </h1>
          <p className="text-stone-500">Discover handpicked traditional and contemporary drapes.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-stone-500 hidden md:block">Sort by:</span>
          <Button variant="outline" className="gap-2">
            Featured
            <ChevronRight className="h-4 w-4 rotate-90" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
          {/* Mobile Filter Toggle */}
          <div className="flex flex-wrap gap-2 lg:hidden mb-4">
            <Button variant="outline" onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className={`space-y-8 ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            {/* Category Filter */}
            <div>
              <h3 className="font-bold text-stone-900 mb-4 flex items-center justify-between">
                Category
              </h3>
              <div className="space-y-3">
                {sareeCategories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox 
                      checked={selectedCategory === cat.id}
                      onCheckedChange={() => setSelectedCategory(cat.id)}
                    />
                    <span className="text-stone-600 group-hover:text-primary transition-colors">
                      {cat.label}
                    </span>
                    <span className="ml-auto text-xs text-stone-400">({getCategoryCount(cat.id)})</span>
                  </label>
                ))}
              </div>
            </div>

            <Separator />

            {/* Price Filter */}
            <div>
              <h3 className="font-bold text-stone-900 mb-4 flex items-center justify-between">
                Price Range
              </h3>
              <div className="space-y-3">
                {priceRanges.map((range) => (
                  <label key={range.id} className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox />
                    <span className="text-stone-600 group-hover:text-primary transition-colors">
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <Separator />

            {/* Color Filter */}
            <div>
              <h3 className="font-bold text-stone-900 mb-4 flex items-center justify-between">
                Color
              </h3>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    aria-label={color.id}
                    className="w-8 h-8 rounded-full ring-2 ring-offset-2 ring-transparent hover:ring-stone-300 focus:ring-stone-400 transition-all border border-stone-200"
                    style={{ backgroundColor: color.color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {/* Active Filters Bar */}
          {selectedCategory !== "all" && (
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary" className="gap-1">
                {sareeCategories.find(c => c.id === selectedCategory)?.label}
                <X className="h-3 w-3" onClick={() => setSelectedCategory("all")} />
              </Badge>
              <button 
                className="text-sm text-stone-500 hover:text-primary underline ml-2"
                onClick={() => setSelectedCategory("all")}
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {filteredProducts.map((product: SareeProduct) => (
              <div key={product.id} className="group flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-stone-100 mb-4">
                  <Image
                    alt={product.name}
                    src={product.image}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant={
                          product.badge === "Best Seller"
                            ? "bestseller"
                            : product.badge === "New"
                            ? "new"
                            : "default"
                        }
                      >
                        {product.badge}
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-0 right-0 px-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex gap-2">
                    <Link href={product.href} className="flex-1">
                      <Button
                        size="lg"
                        className="w-full bg-white hover:bg-stone-50 text-stone-900 shadow-lg gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </Button>
                    </Link>
                    <Button
                      size="icon"
                      variant="white"
                      className="bg-white hover:bg-stone-50 text-stone-900 shadow-lg"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Link href={product.href} className="flex flex-col gap-1">
                  <h3 className="font-medium text-stone-900 text-lg group-hover:text-primary transition-colors truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">₹{product.price.toLocaleString("en-IN")}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-stone-400 text-sm line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                        {product.discount && (
                          <span className="text-green-600 text-xs font-bold">
                            {product.discount}% OFF
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  {product.colors && product.colors.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {product.colors.slice(0, 4).map((color, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-full border border-stone-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-500">No products found in this category.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSelectedCategory("all")}
              >
                View All Sarees
              </Button>
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="mt-12 flex justify-center items-center gap-4">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="default" size="icon">
                1
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
