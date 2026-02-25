import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Truck, BadgeCheck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data";

const bedSizes = [
  {
    name: "King Size",
    description: "108&quot; x 108&quot; • Super King Available",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLe7NhOJdhosOzbag2aiBhRBNKk4TqLgsHsTslWS6ZDqJm_mDHk49ANiX38VpjHqwQpakh8CVFteHcZCZJ1XgZw4mtgtRWtFNurFKaXD0tmuG66WfkzuFIeC_hAvHhxpWNxRFp8e_OG0j9xnD6XDKKZgL4zv6ZvDNqiUxqZs70OUZIrhnXRuZapu2pc5Cxhv9Cgm2YN9YOb_jb2c23H981xTNb3NioK1dyFUkvw4V0COrP8gRBpC3-D9qIZhPgYp9v1-IK4Z4ltg",
    href: "/home-linen?size=king",
  },
  {
    name: "Queen Size",
    description: "90&quot; x 100&quot; • Fitted Options",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGOwiQFf1D2iyge2SGJkkEGT6nXKdRrdiF8yk3PbkEQ6t-a_fwJ1W9h0ebps6otTGAVCE19LMGVxVoA8h7gsm76seKv_bwHIq6kOU1dRu4XOxVR2J5tKCZksnoOpDppesvGi3kQjkNeAUymxDgcTRUtw_3maDFKSv_vWip2R2Woe0w1NYL3FwrlFfBAWXb5A4aDZO6DEn_GeIeVynkh1C_GKaA3laTe73pAOftsZr15Uk90b9cqVl97xOJiKhTC6lNe_cUaijDng",
    href: "/home-linen?size=queen",
  },
  {
    name: "Single Bedsheets",
    description: "60&quot; x 90&quot; • Kids Collection",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLJhz17Qma1km9TpXrzTlNYei4nEsqj6eYjJA755lqE5M8jfEIi74aiKLfZcPH7z5vuPzOa3b58E-o7gpUa4Wny-mmP_DAX3jMX8vsG_cXNX_zJ9VbUi2Q1j9DC4T_1XhgMGDL6d6MOsW9EkuG2-mK_SlOnzUy_jwk2l2njgJtjTnVA341Cv0_Agb5Tossjgms-KpFDYUqKWRSL1qlXUohjv6_eqo8_pkjcu-X7Xp_Gze8UF1nVRfyui2-lq0OlK7SA2cdrer6xA",
    href: "/home-linen?size=single",
  },
];

export default function HomeLinenPage() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10 py-6 flex flex-col gap-8">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Link href="/" className="text-stone-500 hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRightIcon className="h-4 w-4 text-stone-400" />
        <Link href="#" className="text-stone-500 hover:text-primary transition-colors">
          Collections
        </Link>
        <ChevronRightIcon className="h-4 w-4 text-stone-400" />
        <span className="text-stone-900 font-semibold">Home Linen</span>
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
            <Button size="xl" variant="white">
              View Lookbook
            </Button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="flex flex-col gap-6 py-8">
        <div className="flex items-end justify-between px-2">
          <div>
            <h2 className="text-stone-900 text-3xl font-bold tracking-tight">
              Shop by Size
            </h2>
            <p className="text-stone-500 mt-2">Find the perfect fit for your mattress</p>
          </div>
          <Link
            href="#"
            className="hidden md:flex items-center gap-1 text-primary font-bold hover:underline"
          >
            View Size Guide <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bedSizes.map((size) => (
            <Link
              key={size.name}
              href={size.href}
              className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-xl bg-gray-100"
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105">
                <Image
                  alt={size.name}
                  src={size.image}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                <h3 className="text-white text-2xl font-bold mb-2">{size.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-gray-200 text-sm font-medium">{size.description}</p>
                  <span className="size-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div id="products" className="py-12 border-t border-stone-200">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-stone-900 text-2xl font-bold">Best Sellers</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button size="icon">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.bedLinen.map((product) => (
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
