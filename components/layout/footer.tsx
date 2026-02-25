import Link from "next/link";
import { Diamond, Mail, Globe, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="mt-12 bg-neutral-light py-12 text-text-main">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-4 lg:px-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Diamond className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold">Baby Textiles</span>
          </div>
          <p className="text-sm leading-relaxed text-text-sub">
            Celebrating the art of Indian weaving. Bringing authentic,
            handcrafted textiles from the loom to your home.
          </p>
          <div className="flex gap-4 pt-2">
            <Link href="#" className="text-text-sub hover:text-primary">
              <Globe className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-text-sub hover:text-primary">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-primary">Shop</h4>
          <ul className="flex flex-col gap-2 text-sm text-text-sub">
            <li>
              <Link
                href="/sarees"
                className="hover:text-primary transition-colors"
              >
                Silk Sarees
              </Link>
            </li>
            <li>
              <Link
                href="/dhotis"
                className="hover:text-primary transition-colors"
              >
                Cotton Dhotis
              </Link>
            </li>
            <li>
              <Link
                href="/home-linen"
                className="hover:text-primary transition-colors"
              >
                Bed Linen
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Gift Cards
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-primary">Company</h4>
          <ul className="flex flex-col gap-2 text-sm text-text-sub">
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Artisans
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Sustainability
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-primary">Stay Updated</h4>
          <p className="mb-4 text-sm text-text-sub">
            Subscribe for exclusive offers and new arrival alerts.
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="Email address"
              className="bg-white border-none"
            />
            <Button size="icon">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-200 pt-8 text-center text-xs text-text-sub">
        <p>&copy; 2026 Baby Textiles. All rights reserved.</p>
      </div>
    </footer>
  );
}
