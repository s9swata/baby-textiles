import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
    <Card className="group overflow-hidden shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
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
        <div className="absolute bottom-4 left-0 right-0 px-4 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 flex gap-2">
          <Button
            size="lg"
            className="flex-1 bg-card hover:bg-background text-foreground shadow-lg h-14 text-base"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </Button>
          <Button
            size="icon"
            variant="white"
            className="bg-card hover:bg-background text-foreground shadow-lg h-14 w-14"
          >
            <Heart className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <CardFooter className="flex flex-col items-start gap-1 p-4">
        <Link href={href} className="flex flex-col gap-1 w-full">
          <h3 className="font-medium text-foreground text-lg group-hover:text-primary transition-colors truncate">
            {name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">₹{price.toLocaleString()}</span>
            {originalPrice && (
              <>
                <span className="text-muted-foreground/80 text-sm line-through">
                  ₹{originalPrice.toLocaleString()}
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
                  className="w-3 h-3 rounded-full border border-border"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </Link>
      </CardFooter>
    </Card>
  );
}
