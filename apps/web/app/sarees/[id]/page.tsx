"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Star,
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  CheckCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSareeById, SareeProduct } from "@baby-textiles/schemas";
import { useCart } from "@/context/CartContext";

const careInstructions = [
  {
    icon: "dry-cleaning",
    title: "Dry Clean Only",
    description: "Recommended for first few washes to maintain sheen.",
  },
  {
    icon: "iron",
    title: "Iron on Low Heat",
    description: "Always iron on the reverse side to protect zari.",
  },
  {
    icon: "water",
    title: "Avoid Moisture",
    description: "Store in a muslin cloth in a dry place.",
  },
];

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [blouseStitching, setBlouseStitching] = useState("unstitched");
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      const resolvedParams = await params;
      const saree = getSareeById(resolvedParams.id);
      setProduct(saree ?? null);
      setIsLoading(false);
    };
    loadProduct();
  }, [params]);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 md:px-10 pb-12 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 md:px-10 pb-12">
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
          <h2 className="text-2xl font-bold text-foreground">Product Not Found</h2>
          <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
          <Link href="/sarees">
            <Button>Browse Sarees</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentProduct: SareeProduct = product;

  const productImages = currentProduct.images && currentProduct.images.length > 0 
    ? currentProduct.images 
    : [currentProduct.image];

  const discount = currentProduct.originalPrice 
    ? Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100)
    : null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-10 pb-12">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 text-sm md:text-base py-4">
        <Link href="/" className="text-muted-foreground hover:text-primary font-medium">
          Home
        </Link>
        <span className="text-muted-foreground font-medium">/</span>
        <Link href="/sarees" className="text-muted-foreground hover:text-primary font-medium">
          Sarees
        </Link>
        <span className="text-muted-foreground font-medium">/</span>
        <span className="text-foreground font-bold">{currentProduct.name}</span>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Images */}
        <div className="flex flex-col gap-4">
          {/* Main Image */}
          <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-secondary relative group cursor-zoom-in">
            <Image
              alt={currentProduct.name}
              src={productImages[selectedImage]}
              width={600}
              height={750}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              unoptimized
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm hover:bg-card"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {productImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === i
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary"
                }`}
              >
                <Image
                  alt={`View ${i + 1}`}
                  src={img}
                  width={150}
                  height={150}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {currentProduct.badge && (
                <Badge variant={currentProduct.badge === "Best Seller" ? "bestseller" : currentProduct.badge === "New" ? "new" : "default"}>
                  {currentProduct.badge}
                </Badge>
              )}
              <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                SKU: {currentProduct.sku}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
              {currentProduct.name}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-primary">
                <Star className="fill-current h-5 w-5" />
                <Star className="fill-current h-5 w-5" />
                <Star className="fill-current h-5 w-5" />
                <Star className="fill-current h-5 w-5" />
                <Star className="fill-current h-4 w-4" />
              </div>
              <span className="text-sm text-muted-foreground font-medium hover:text-primary cursor-pointer underline underline-offset-2">
                124 Reviews
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-end gap-3 pb-6 border-b border-b-stone-200">
            <span className="text-4xl font-bold text-foreground">₹{currentProduct.price.toLocaleString()}</span>
            {currentProduct.originalPrice != null && (
              <>
                <span className="text-xl text-muted-foreground line-through mb-1.5">₹{(currentProduct.originalPrice as number).toLocaleString()}</span>
                {discount != null && (
                  <span className="text-primary font-bold mb-1.5 ml-1">{discount}% OFF</span>
                )}
              </>
            )}
          </div>

          {/* Description */}
          <div className="space-y-4">
            <p className="text-muted-foreground/90 leading-relaxed">
              {currentProduct.description}
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-sm text-muted-foreground/90">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>100% {currentProduct.material}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground/90">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Size: {currentProduct.size}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground/90">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{currentProduct.blousePiece}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground/90">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Color: {currentProduct.colorName}</span>
              </li>
            </ul>
          </div>

          {/* Blouse Stitching Selector */}
          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-foreground">Blouse Stitching</span>
              <Link href="#" className="text-primary text-sm font-medium hover:underline">
                Size Guide
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <label className="cursor-pointer">
                <input
                  checked={blouseStitching === "unstitched"}
                  onChange={() => setBlouseStitching("unstitched")}
                  type="radio"
                  name="blouse"
                  className="peer sr-only"
                />
                <div className="rounded-lg border border-border px-4 py-3 text-center text-sm font-medium hover:border-primary peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all">
                  Unstitched
                </div>
              </label>
              <label className="cursor-pointer">
                <input
                  checked={blouseStitching === "stitched"}
                  onChange={() => setBlouseStitching("stitched")}
                  type="radio"
                  name="blouse"
                  className="peer sr-only"
                />
                <div className="rounded-lg border border-border px-4 py-3 text-center text-sm font-medium hover:border-primary peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all">
                  Stitched (+₹899)
                </div>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <div className="flex items-center border border-border rounded-lg w-max">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 font-semibold min-w-[3ch] text-center">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              size="xl" 
              className="flex-1 gap-2 h-14"
              onClick={() => {
                if (product) {
                  addToCart(product, quantity, { blouseStitching });
                }
              }}
            >
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button 
              size="xl" 
              variant="secondary" 
              className="flex-1 h-14"
              onClick={() => {
                if (product) {
                  addToCart(product, quantity, { blouseStitching });
                  router.push("/checkout?buyNow=true");
                }
              }}
            >
              Buy Now
            </Button>
          </div>

          {/* Delivery & Trust */}
          <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-border">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="size-10 rounded-full bg-muted flex items-center justify-center text-primary">
                <Truck className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="size-10 rounded-full bg-muted flex items-center justify-center text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">Silk Mark Certified</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="size-10 rounded-full bg-muted flex items-center justify-center text-primary">
                <RotateCcw className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">7 Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Care & Details Section */}
      <div className="bg-card py-16 mt-12 max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Product Care */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Product Care</h3>
              <div className="grid grid-cols-1 gap-4">
                {product.washCare ? (
                  <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-bold text-sm mb-1">Wash Care Instructions</p>
                      <p className="text-xs text-muted-foreground">{product.washCare}</p>
                    </div>
                  </div>
                ) : (
                  careInstructions.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-background rounded-lg"
                    >
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-bold text-sm mb-1">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Weave Details */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Product Details</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {product.material} saree perfect for {product.occasion?.toLowerCase() || "casual and formal occasions"}. 
                This exquisite piece is crafted with attention to detail and quality, ensuring you look elegant for any event.
              </p>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-foreground mb-4">Specifications</h3>
            <div className="divide-y divide-border border-y border-border">
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground font-medium">Material</span>
                <span className="text-foreground font-semibold text-right">{product.material}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground font-medium">Color</span>
                <span className="text-foreground font-semibold text-right">{product.colorName}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground font-medium">Size</span>
                <span className="text-foreground font-semibold text-right">{product.size}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground font-medium">Blouse Piece</span>
                <span className="text-foreground font-semibold text-right">{product.blousePiece}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground font-medium">Occasion</span>
                <span className="text-foreground font-semibold text-right">{product.occasion}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground font-medium">SKU</span>
                <span className="text-foreground font-semibold text-right">{currentProduct.sku}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
