"use client";

import { useState } from "react";
import Link from "next/link";
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
import { productSpecs, testimonials } from "@/lib/data";

const productImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBjrP020l9aGfHVh4syeO_dG1Hx3sqUeuhv8eBhea7-6bq4lUgeKxfWe-TPLjBfIvK4LbY9ez3x3aiiB57VwRrslIYZH4svQYffbss14y9NMMxRrpO87VrPCSDJeNk2G0nPrwsBWZDsZjCGns9uz8KGtoimdiuNWa5LitLQpywB8FVnAxeCh60uhqWzBXukXaemDR9KXQ_JhrLo_fXf1So6UpTAvn1eOzNtCsumhAmkvYkh19ZzRKNq4hoWXukM5FzctXY3eJbHaQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBSk7L6ATt_fO2Aly969GekX5cCyzHgCHiMO27ivzFA0lwGaJA_Cs2erdZ9pELKsvR3bTquK7WPfg1LbU_GucUUgO3-hBjO9_tOe258pR2e0i8YPJ4H_JMC1jwGrdo2AXKc7lmtYOW80w14gLjAaM-36bzsylJst-SRx5kwdX9idHCusdPkf9VGbYzC3NHLr5tTZcrOHpvubdElGPaIiUeNqDV5PzIAYGiWvlQAv_kdQkGrC-QbLjNvfph42aFQiHJjBdaMoXQFLw",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD0_YUEfKLaQsLq_JXjqI0y1vRFfj-cSEPRPhhDJS9JqWwLFde1fOU6MXYphnnw4FYhr_ce7-mHRKbXHJZcbYBduvT1PyvScCRF6g1oa0I138V9tuajNRb1qwthLb9nfervn2yXixF7QxrcfoksH9UgzMxubeaD8FFfsVJAohnK4-BZ8GHTCO-gfIJ1OZeJdatAJLKiQ7uYCv-lIogE6r4_fMFvDdPd63qrRje1peqCS9c511vxfFNuYypXO_WIBzRYXHRHaHjrpA",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAJSsczor4BbU4xuF775yQpaaJRQqSf4xmcysNf1skYbOCErL7uz7ucujZt85881X2wAxPZ1AHrfhYnPckX8WnQjaYibIEuzicyXR7O9f5HP2QVkTQark4_v8fLHT3I_DG5akRwYtE5kw91z_z2blswBEmK2kx8ACIln_xKDCtq2WDnKyEhyr6g2mTDWxT68Bu-2wHAKjkZcdl_Ute8ZhsEGXFRFMsVMWAd2hQSLpkrwC3MhJECovNnRkgL03PGgbXyCaEcIwur6A",
];

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

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [blouseStitching, setBlouseStitching] = useState("unstitched");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-10 pb-12">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 text-sm md:text-base py-4">
        <Link href="/" className="text-stone-500 hover:text-primary font-medium">
          Home
        </Link>
        <span className="text-stone-500 font-medium">/</span>
        <Link href="/sarees" className="text-stone-500 hover:text-primary font-medium">
          Sarees
        </Link>
        <span className="text-stone-500 font-medium">/</span>
        <span className="text-stone-900 font-bold">Banarasi Silk</span>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Images */}
        <div className="flex flex-col gap-4">
          {/* Main Image */}
          <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-stone-200 relative group cursor-zoom-in">
            <Image
              alt="Royal Blue Banarasi Silk Saree"
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
              <Badge variant="bestseller">Best Seller</Badge>
              <span className="text-stone-500 text-xs font-medium uppercase tracking-wider">
                SKU: BNR-SILK-004
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 leading-tight mb-2">
              Royal Blue Banarasi Silk Saree with Gold Zari
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-primary">
                <Star className="fill-current h-5 w-5" />
                <Star className="fill-current h-5 w-5" />
                <Star className="fill-current h-5 w-5" />
                <Star className="fill-current h-5 w-5" />
                <Star className="fill-current h-4 w-4" />
              </div>
              <span className="text-sm text-stone-500 font-medium hover:text-primary cursor-pointer underline underline-offset-2">
                124 Reviews
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-end gap-3 pb-6 border-b border-stone-200">
            <span className="text-4xl font-bold text-stone-900">₹12,499</span>
            <span className="text-xl text-stone-500 line-through mb-1.5">₹18,999</span>
            <span className="text-primary font-bold mb-1.5 ml-1">34% OFF</span>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <p className="text-stone-700 leading-relaxed">
              Experience the regal elegance of Banaras with this exquisite Royal Blue
              saree. Handwoven by master artisans, this saree features intricate gold
              Zari work inspired by Mughal architecture. The pure silk fabric drapes
              effortlessly, making it perfect for weddings and festive occasions.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-sm text-stone-700">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>100% Pure Banarasi Silk</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-stone-700">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Handwoven Gold Zari Border</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-stone-700">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Includes Unstitched Blouse Piece (80cm)</span>
              </li>
            </ul>
          </div>

          {/* Blouse Stitching Selector */}
          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-stone-900">Blouse Stitching</span>
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
                <div className="rounded-lg border border-stone-300 px-4 py-3 text-center text-sm font-medium hover:border-primary peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all">
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
                <div className="rounded-lg border border-stone-300 px-4 py-3 text-center text-sm font-medium hover:border-primary peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all">
                  Stitched (+₹899)
                </div>
              </label>
            </div>
          </div>

          {/* Actions */}
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
            <Button size="xl" className="flex-1 gap-2 h-14">
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="xl" variant="secondary" className="flex-1 h-14">
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
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-stone-600">Silk Mark Certified</span>
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

      {/* Product Care & Details Section */}
      <div className="bg-white py-16 mt-12 max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Product Care */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4">Product Care</h3>
              <div className="grid grid-cols-1 gap-4">
                {careInstructions.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-stone-50 rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-bold text-sm mb-1">{item.title}</p>
                      <p className="text-xs text-stone-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weave Details */}
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4">Weave Details</h3>
              <p className="text-stone-600 mb-4 leading-relaxed">
                This saree employs the ancient Kadhua technique, where each motif is
                woven separately by hand without any loose threads at the back. It is
                a labor-intensive process that results in a cleaner, more durable
                fabric with raised motifs that feel like embroidery.
              </p>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-stone-900 mb-4">Specifications</h3>
            <div className="divide-y divide-stone-200 border-y border-stone-200">
              {Object.entries(productSpecs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3">
                  <span className="text-stone-500 font-medium">
                    {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                  </span>
                  <span className="text-stone-900 font-semibold text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-stone-900 mb-8">Customer Reviews</h2>
        
        <div className="flex flex-col lg:flex-row gap-12 mb-12">
          {/* Summary Stats */}
          <div className="w-full lg:w-1/3 bg-white p-8 rounded-xl shadow-sm border border-stone-100">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
              <p className="text-stone-900 text-6xl font-black">4.8</p>
              <div className="flex flex-col items-start">
                <div className="flex gap-0.5 text-primary mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i <= 4 ? "fill-current" : ""}`}
                    />
                  ))}
                </div>
                <p className="text-stone-500 text-sm">Based on 124 reviews</p>
              </div>
            </div>

            {/* Rating Bars */}
            <div className="flex flex-col gap-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="grid grid-cols-[20px_1fr_40px] items-center gap-3">
                  <span className="text-sm font-bold">{rating}</span>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width:
                          rating === 5
                            ? "77%"
                            : rating === 4
                            ? "15%"
                            : rating === 3
                            ? "5%"
                            : rating === 2
                            ? "1%"
                            : "2%",
                      }}
                    />
                  </div>
                  <span className="text-xs text-stone-500 text-right">
                    {rating === 5 ? "77%" : rating === 4 ? "15%" : rating === 3 ? "5%" : rating === 2 ? "1%" : "2%"}
                  </span>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-8">
              Write a Review
            </Button>
          </div>

          {/* Review List */}
          <div className="flex-1 space-y-6">
            {testimonials.map((review) => (
              <div
                key={review.id}
                className="border-b border-stone-200 pb-6 last:border-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 text-sm">{review.name}</p>
                      <div className="flex text-primary text-xs">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i <= review.rating ? "fill-current" : ""}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-stone-500">{review.date}</span>
                </div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">{review.title}</h4>
                <p className="text-stone-600 text-sm leading-relaxed">{review.content}</p>
              </div>
            ))}
            <Button variant="link" className="text-primary font-bold text-sm">
              View all 124 reviews
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
