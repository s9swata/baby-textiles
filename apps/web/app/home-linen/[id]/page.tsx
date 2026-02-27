"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  CheckCircle,
  Truck,
  BadgeCheck,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getBedLinenById, BedLinenProduct } from "@baby-textiles/schemas";
import { useCart } from "@/context/CartContext";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      const resolvedParams = await params;
      const bedLinen = getBedLinenById(resolvedParams.id);
      setProduct(bedLinen ?? null);
      setIsLoading(false);
    };
    loadProduct();
  }, [params]);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 md:px-10 pb-12 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-stone-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 md:px-10 pb-12">
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
          <h2 className="text-2xl font-bold text-stone-900">Product Not Found</h2>
          <p className="text-stone-500">The product you're looking for doesn't exist.</p>
          <Link href="/home-linen">
            <Button>Browse Home Linen</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentProduct: BedLinenProduct = product;

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
        <Link href="/" className="text-stone-500 hover:text-primary font-medium">
          Home
        </Link>
        <span className="text-stone-500 font-medium">/</span>
        <Link href="/home-linen" className="text-stone-500 hover:text-primary font-medium">
          Home Linen
        </Link>
        <span className="text-stone-500 font-medium">/</span>
        <span className="text-stone-900 font-bold">{currentProduct.name}</span>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Images */}
        <div className="flex flex-col gap-4">
          {/* Main Image */}
          <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-stone-200 relative group cursor-zoom-in">
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
              className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <Heart className="h-5 w-5" />
            </Button>
            {currentProduct.badge && (
              <div className="absolute top-4 left-4">
                <Badge variant="sale">{currentProduct.badge}</Badge>
              </div>
            )}
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
                    : "border-stone-200 hover:border-primary"
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
              <span className="text-stone-500 text-xs font-medium uppercase tracking-wider">
                SKU: {currentProduct.sku}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 leading-tight mb-2">
              {currentProduct.name}
            </h1>
            <p className="text-stone-500 text-sm">
              {currentProduct.category}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-end gap-3 pb-6 border-b border-b-stone-200">
            <span className="text-4xl font-bold text-stone-900">₹{currentProduct.price.toLocaleString()}</span>
            {currentProduct.originalPrice != null && (
              <>
                <span className="text-xl text-stone-500 line-through mb-1.5">₹{(currentProduct.originalPrice as number).toLocaleString()}</span>
                {discount != null && (
                  <span className="text-green-600 font-bold mb-1.5 ml-1">{discount}% OFF</span>
                )}
              </>
            )}
          </div>

          {/* Description */}
          <div className="space-y-4">
            <p className="text-stone-700 leading-relaxed">
              {currentProduct.description}
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-sm text-stone-700">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>100% {currentProduct.material}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-stone-700">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Size: {currentProduct.size}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-stone-700">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Color: {currentProduct.colorName}</span>
              </li>
            </ul>
          </div>

          {/* Color Selection */}
          {currentProduct.colors && currentProduct.colors.length > 0 && (
            <div className="space-y-3 pt-4">
              <span className="font-bold text-stone-900">Available Colors</span>
              <div className="flex gap-2">
                {currentProduct.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-stone-200 cursor-pointer hover:border-primary transition-colors"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <div className="flex items-center border border-stone-300 rounded-lg w-max">
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
                  addToCart(product, quantity);
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
                  addToCart(product, quantity);
                  router.push("/checkout?buyNow=true");
                }
              }}
            >
              Buy Now
            </Button>
          </div>

          {/* Delivery & Trust */}
          <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-stone-200">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="size-10 rounded-full bg-stone-100 flex items-center justify-center text-primary">
                <Truck className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-stone-600">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="size-10 rounded-full bg-stone-100 flex items-center justify-center text-primary">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-stone-600">Quality Certified</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="size-10 rounded-full bg-stone-100 flex items-center justify-center text-primary">
                <RotateCcw className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-stone-600">7 Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="bg-white py-16 mt-12 max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Product Care */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4">Wash Care</h3>
              <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-sm text-stone-600">{currentProduct.washCare}</p>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4">Key Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-stone-600">Handcrafted by artisans in Bhagalpur</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-stone-600">All-season use - warm in winter, cool in summer</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-stone-600">Becomes softer with each wash</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-stone-600">Multi-purpose: blanket, bedspread, sofa throw</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-stone-900 mb-4">Specifications</h3>
            <div className="divide-y divide-stone-200 border-y border-stone-200">
              <div className="flex justify-between py-3">
                <span className="text-stone-500 font-medium">Material</span>
                <span className="text-stone-900 font-semibold text-right">{currentProduct.material}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-stone-500 font-medium">Size</span>
                <span className="text-stone-900 font-semibold text-right">{currentProduct.size}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-stone-500 font-medium">Color</span>
                <span className="text-stone-900 font-semibold text-right">{currentProduct.colorName}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-stone-500 font-medium">Category</span>
                <span className="text-stone-900 font-semibold text-right">{currentProduct.category}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-stone-500 font-medium">SKU</span>
                <span className="text-stone-900 font-semibold text-right">{currentProduct.sku}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-stone-500 font-medium">Origin</span>
                <span className="text-stone-900 font-semibold text-right">Bhagalpur, Bihar (Silk City of India)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
