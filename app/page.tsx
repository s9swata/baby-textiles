import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/data";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full px-4 pt-6 pb-8 lg:px-12">
        <div className="relative overflow-hidden rounded-2xl bg-neutral-light shadow-sm">
          <div className="absolute inset-0 z-0 bg-cover bg-center">
            <Image
              alt="Luxurious red silk saree texture with gold borders"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAWotGmz47_spODaOhM6wWvqtaUYL1D1FtfRE1dOrDlmH7jiIwiwuBrSPgwSCqsnTv0JCji-tl-QkEB_XgU3dEn-is3V9C04zWa3eb5ioMvMNk23LOJkJMyTHjDuWkq5LNtBv2bm1DL2dGOiQ2hUBrrCUjntLWUptF8rdFTQGE9rR2oVG35RA_IUJDZgOuuSVGu_p3hROeQpLvimfXOHK-0o5b3VU9hyEAUqrFox3cQzgV7wOtyN3ndaN5WSvZgEmBn4M5sfmnSQ"
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 flex min-h-[500px] flex-col justify-center px-6 py-12 md:px-12 lg:w-3/5">
            <span className="mb-4 inline-block w-fit rounded-full bg-primary/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
              Premium Collection 2024
            </span>
            <h2 className="mb-4 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              Timeless Elegance in Every Thread
            </h2>
            <p className="mb-8 text-lg font-medium text-gray-200              Explore our hand md:text-xl">
crafted collection of premium Kanjivaram silk
              sarees and traditional dhotis woven with heritage.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/sarees">
                <Button size="lg" className="gap-2">
                  Shop Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/sarees">
                <Button variant="white" size="lg">
                  View Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-8 lg:px-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-main md:text-3xl">
              Shop by Category
            </h2>
            <p className="mt-2 text-text-sub">Curated collections for every occasion</p>
          </div>
          <Link
            href="#"
            className="hidden items-center text-sm font-bold text-primary hover:underline md:flex"
          >
            View all categories{" "}
            <span className="ml-1">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-xl aspect-[3/4] md:aspect-[4/5] shadow-sm transition-all hover:shadow-md"
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105">
                <Image
                  alt={category.name}
                  src={category.image}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
                <p className="mt-1 text-sm text-gray-200 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                  {category.description}
                </p>
              </div>
              <div className="absolute top-4 right-4 rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition-transform group-hover:rotate-45">
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Craftsmanship Story */}
      <section className="my-8 bg-neutral-light px-4 py-16 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row">
          <div className="flex-1 space-y-6">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Our Heritage
            </span>
            <h2 className="text-3xl font-bold leading-tight text-text-main md:text-4xl">
              Weaving Stories into <br />
              Every Fabric
            </h2>
            <p className="text-lg text-text-sub">
              For over three decades, Baby Textiles has been synonymous with
              quality and tradition. Our artisans in Kanchipuram and Varanasi
              dedicate weeks to weave a single saree, ensuring every motif
              tells a story of our rich cultural past.
            </p>
            <div className="flex items-center gap-8 pt-4">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-black text-primary">50+</span>
                <span className="text-sm font-medium text-text-sub">
                  Years Legacy
                </span>
              </div>
              <div className="h-10 w-px bg-gray-300" />
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-black text-primary">10k+</span>
                <span className="text-sm font-medium text-text-sub">
                  Happy Customers
                </span>
              </div>
              <div className="h-10 w-px bg-gray-300" />
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-black text-primary">100%</span>
                <span className="text-sm font-medium text-text-sub">Handloom</span>
              </div>
            </div>
          </div>
          <div className="relative flex-1">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                alt="Indian artisan weaving on a handloom"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4mvfVOWaJx6VZ9OgTPNodYAxqTm3qyj2c-qO5lGLumIefAxnuOoRWExp0lO0EkymC0ryBiK9T0K7RpDbAaVWucFgBijPc4bUTyx_Xri8ScYjR5PLWdBJRl02fxSCYBKGjv_YHkLAO2ng_AvPMQRiSsG1_kaOhzcfMPR0M4_lX88NfiB3-krWkJfGuKNUz4yA4-jN9sprRiwX-RcubH7DAgtEXmD_YDzgF79H4gk_AlPbrO_Cu5yde67EY-8cbXlGE03R0S5pdQQ"
                width={500}
                height={400}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
            <div className="absolute -bottom-6 -left-6 -z-10 h-full w-full rounded-2xl border-2 border-primary/20 bg-transparent" />
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="px-4 py-12 lg:px-12">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-text-main md:text-3xl">
            New Arrivals
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {products.sarees.slice(0, 4).map((product) => (
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
      </section>
    </>
  );
}
