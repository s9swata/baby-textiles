import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone, Award, Users, Leaf } from "lucide-react";

export const metadata = {
  title: "About Us - Baby Textiles",
  description:
    "Discover the story of Baby Textiles - a legacy of handcrafted Indian textiles, weaving tradition into every thread.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:px-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-main md:text-4xl">
          Our Story
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-text-sub">
          Celebrating the art of Indian weaving since 2014
        </p>
      </div>

      <div className="mb-16 grid gap-12 md:grid-cols-2 md:items-center">
        <div className="relative aspect-square overflow-hidden rounded-2xl shadow-lg">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4mvfVOWaJx6VZ9OgTPNodYAxqTm3qyj2c-qO5lGLumIefAxnuOoRWExp0lO0EkymC0ryBiK9T0K7RpDbAaVWucFgBijPc4bUTyx_Xri8ScYjR5PLWdBJRl02fxSCYBKGjv_YHkLAO2ng_AvPMQRiSsG1_kaOhzcfMPR0M4_lX88NfiB3-krWkJfGuKNUz4yA4-jN9sprRiwX-RcubH7DAgtEXmD_YDzgF79H4gk_AlPbrO_Cu5yde67EY-8cbXlGE03R0S5pdQQ"
            alt="Artisan weaving on handloom"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-text-main">
            A Legacy Woven with Love
          </h2>
          <p className="text-text-sub">
            Baby Textiles was founded in 2014 by Pradim Kumar Sah with a singular
            vision: to preserve the ancient art of handloom weaving while bringing
            authentic Indian textiles to modern homes. What started as a small
            family business has grown into a trusted name for premium silk sarees and
            home furnishings.
          </p>
          <p className="text-text-sub">
            Our weavers are masters of their craft, with generations of expertise
            passed down through families. Each piece tells a story of dedication,
            patience, and unparalleled skill.
          </p>
        </div>
      </div>

      <div className="mb-16 rounded-2xl bg-neutral-light p-8 md:p-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-text-main">10+ Years</h3>
            <p className="text-text-sub">
              Of Excellence in Handloom Weaving
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-text-main">500+</h3>
            <p className="text-text-sub">Artisan Families Supported</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-text-main">100%</h3>
            <p className="text-text-sub">Handcrafted & Sustainable</p>
          </div>
        </div>
      </div>

      <div className="mb-16 grid gap-12 md:grid-cols-2 md:items-center">
        <div className="order-2 space-y-6 md:order-1">
          <h2 className="text-2xl font-bold text-text-main">
            Our Weaving Heritage
          </h2>
          <p className="text-text-sub">
            We work directly with weavers from Kanchipuram, Varanasi, and other
            renowned textile centers of India. Our collection features the finest
            Kanjivaram silk, Banarasi weaves, and handcrafted bed linens that
            embody centuries of tradition.
          </p>
          <p className="text-text-sub">
            Every saree in our collection takes anywhere from 3 days to 3 weeks
            to create, depending on the complexity of the design. We believe in
            fair wages for our artisans and sustainable practices that protect
            this ancient craft for future generations.
          </p>
        </div>
        <div className="relative order-1 aspect-square overflow-hidden rounded-2xl shadow-lg md:order-2">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAWotGmz47_spODaOhM6wWvqtaUYL1D1FtfRE1dOrDlmH7jiIwiwuBrSPgwSCqsnTv0JCji-tl-QkEB_XgU3dEn-is3V9C04zWa3eb5ioMvMNk23LOJkJMyTHjDuWkq5LNtBv2bm1DL2dGOiQ2hUBrrCUjntLWUptF8rdFTQGE9rR2oVG35RA_IUJDZgOuuSVGu_p3hROeQpLvimfXOHK-0o5b3VU9hyEAUqrFox3cQzgV7wOtyN3ndaN5WSvZgEmBn4M5sfmnSQ"
            alt="Beautiful silk saree"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-text-main">
          Our Core Values
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-card p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-bold text-text-main">
              Authenticity
            </h3>
            <p className="text-text-sub">
              Every piece is guaranteed authentic, handcrafted by skilled artisans
              using traditional techniques passed down through generations.
            </p>
          </div>
          <div className="rounded-xl bg-card p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-bold text-text-main">
              Sustainability
            </h3>
            <p className="text-text-sub">
              We are committed to sustainable practices - from eco-friendly dyes to
              supporting handloom weavers and preserving traditional crafts.
            </p>
          </div>
          <div className="rounded-xl bg-card p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-bold text-text-main">
              Quality
            </h3>
            <p className="text-text-sub">
              Each product undergoes strict quality checks to ensure you receive
              nothing less than the finest Indian textiles.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
        <h2 className="mb-4 text-2xl font-bold">
          Experience the Beauty of Handloom
        </h2>
        <p className="mx-auto mb-6">
          Explore our curated max-w-xl collection of premium silk sarees and home linens,
          each woven with love and tradition.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/sarees"
            className="rounded-full bg-card px-8 py-3 font-semibold text-primary transition hover:bg-accent"
          >
            Shop Sarees
          </Link>
          <Link
            href="/home-linen"
            className="rounded-full border-2 border-primary-foreground px-8 py-3 font-semibold text-primary-foreground transition hover:bg-card/10"
          >
            Shop Bed Linen
          </Link>
        </div>
      </div>
    </div>
  );
}
