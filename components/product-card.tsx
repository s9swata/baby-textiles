import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number | null;
  discount?: number | null;
  image: string;
  colors?: string[];
  badge?: string | null;
  href: string;
}

export function ProductCard({
  name,
  price,
  originalPrice,
  discount,
  image,
  colors,
  badge,
  href,
}: ProductCardProps) {
  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-stone-100 mb-4">
        <Image
          alt={name}
          src={image}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />
        {badge && (
          <div className="absolute top-3 left-3">
            <Badge
              variant={
                badge === "Best Seller"
                  ? "bestseller"
                  : badge === "New"
                  ? "new"
                  : badge === "Sale"
                  ? "sale"
                  : badge === "Eco-friendly"
                  ? "eco"
                  : "default"
              }
            >
              {badge}
            </Badge>
          </div>
        )}
        <div className="absolute bottom-4 left-0 right-0 px-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex gap-2">
          <Button
            size="lg"
            className="flex-1 bg-white hover:bg-stone-50 text-stone-900 shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
          <Button
            size="icon"
            variant="white"
            className="bg-white hover:bg-stone-50 text-stone-900 shadow-lg"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <Link href={href} className="flex flex-col gap-1">
        <h3 className="font-medium text-stone-900 text-lg group-hover:text-primary transition-colors truncate">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-bold text-stone-900">${price.toFixed(2)}</span>
          {originalPrice && (
            <>
              <span className="text-stone-400 text-sm line-through">
                ${originalPrice.toFixed(2)}
              </span>
              {discount && (
                <span className="text-green-600 text-xs font-bold">
                  {discount}% OFF
                </span>
              )}
            </>
          )}
        </div>
        {colors && colors.length > 0 && (
          <div className="flex gap-1 mt-1">
            {colors.slice(0, 4).map((color, i) => (
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
  );
}
