"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">Order Placed Successfully!</h1>
        
        <p className="mt-3 text-lg text-muted-foreground">
          Thank you for your order. We've received your request and will process it shortly.
        </p>
        
        {orderNumber && (
          <div className="mt-6 inline-block rounded-lg bg-background px-6 py-3">
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="font-mono font-medium text-foreground">
              {orderNumber}
            </p>
          </div>
        )}
        
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button size="lg" className="gap-2">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 flex items-center justify-center gap-8 text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <Package className="h-6 w-6" />
            <span className="text-sm">Free Shipping</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className="h-6 w-6" />
            <span className="text-sm">Quality Assured</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SuccessContent />
    </Suspense>
  );
}
