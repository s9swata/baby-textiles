"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CreditCard, Wallet, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart, CartItem } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";

interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

type PaymentMethod = "online" | "cod";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoaded: isUserLoaded } = useUser();
  const { items, getTotal, clearCart } = useCart();
  
  const isBuyNow = searchParams.get("buyNow") === "true";
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [isMockPayment, setIsMockPayment] = useState(false);
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    phone: "",
  });
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");
  
  const total = getTotal();
  const cartItems = items;

  useEffect(() => {
    if (isUserLoaded && !user) {
      router.push("/sign-in?redirect_url=/checkout");
    }
  }, [user, isUserLoaded, router]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const validateStep1 = () => {
    return (
      shippingAddress.fullName &&
      shippingAddress.addressLine1 &&
      shippingAddress.city &&
      shippingAddress.state &&
      shippingAddress.postalCode &&
      shippingAddress.phone &&
      cartItems.length > 0
    );
  };

  const handlePlaceOrder = async () => {
    if (!validateStep1()) return;
    
    setIsProcessing(true);
    
    try {
      const orderItems = cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        sku: item.sku,
      }));
      
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          items: orderItems,
          shippingAddress,
          paymentMethod,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        alert(data.error || "Failed to create order");
        setIsProcessing(false);
        return;
      }
      
      if (paymentMethod === "cod" || data.isMock) {
        if (data.isMock) {
          setIsMockPayment(true);
        }
        setOrderId(data.orderId);
        setOrderNumber(data.orderNumber);
        clearCart();
        router.push(`/checkout/success?orderNumber=${data.orderNumber}`);
      } else {
        setOrderId(data.orderId);
        setOrderNumber(data.orderNumber);
        setStep(2);
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Failed to create order");
    }
    
    setIsProcessing(false);
  };

  const handleConfirmPayment = async () => {
    if (!orderId) return;
    
    setIsProcessing(true);
    
    try {
      const response = await fetch(`/api/orders/${orderId}/confirm`, {
        method: "POST",
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        alert(data.error || "Failed to confirm payment");
        setIsProcessing(false);
        return;
      }
      
      clearCart();
      router.push(`/checkout/success?orderNumber=${orderNumber}`);
    } catch (error) {
      console.error("Confirm payment error:", error);
      alert("Failed to confirm payment");
    }
    
    setIsProcessing(false);
  };

  if (!isUserLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (cartItems.length === 0 && step === 1) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold text-stone-900">Your cart is empty</h2>
        <p className="mt-2 text-stone-500">Add some items to your cart to checkout.</p>
        <Link href="/sarees">
          <Button className="mt-6">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <div className="mb-6">
        <Link href="/cart" className="flex items-center gap-2 text-stone-600 hover:text-stone-900">
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-stone-900">Checkout</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={shippingAddress.fullName}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="addressLine1">Address Line 1</Label>
                      <Input
                        id="addressLine1"
                        type="text"
                        name="addressLine1"
                        value={shippingAddress.addressLine1}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                      <Input
                        id="addressLine2"
                        type="text"
                        name="addressLine2"
                        value={shippingAddress.addressLine2}
                        onChange={handleAddressChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        type="text"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        type="text"
                        name="state"
                        value={shippingAddress.state}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        type="text"
                        name="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        type="text"
                        name="country"
                        value={shippingAddress.country}
                        onChange={handleAddressChange}
                        disabled
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={shippingAddress.phone}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <label className="flex cursor-pointer items-center justify-between rounded-lg bg-stone-50 p-4 hover:bg-stone-100">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="online"
                          checked={paymentMethod === "online"}
                          onChange={() => setPaymentMethod("online")}
                          className="h-4 w-4 text-primary"
                        />
                        <CreditCard className="h-5 w-5 text-stone-400" />
                        <span className="font-medium text-stone-900">Online Payment</span>
                      </div>
                    </label>
                    <label className="flex cursor-pointer items-center justify-between rounded-lg bg-stone-50 p-4 hover:bg-stone-100">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="h-4 w-4 text-primary"
                        />
                        <Wallet className="h-5 w-5 text-stone-400" />
                        <span className="font-medium text-stone-900">Cash on Delivery</span>
                      </div>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Confirm Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-lg font-medium text-stone-900">Order Created Successfully!</p>
                  <p className="mt-2 text-stone-500">
                    Please confirm your payment to complete the order.
                  </p>
                  <div className="mt-6 rounded-lg bg-stone-50 p-4">
                    <p className="text-sm text-stone-600">
                      This is a <span className="font-medium text-amber-600">mock payment</span> for testing.
                    </p>
                    <p className="text-sm text-stone-500 mt-1">
                      Click "Confirm Payment" to simulate a successful payment.
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleConfirmPayment}
                  disabled={isProcessing}
                  className="mt-6 w-full"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm Payment"
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-stone-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-stone-900 line-clamp-1">{item.name}</p>
                      <p className="text-sm text-stone-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium text-stone-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t pt-4 space-y-2">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 pt-2 border-t">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
            
            {step === 1 && (
              <Button
                onClick={handlePlaceOrder}
                disabled={!validateStep1() || isProcessing}
                className="mt-6 w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : paymentMethod === "cod" ? (
                  "Place Order"
                ) : (
                  "Proceed to Payment"
                )}
              </Button>
            )}
            
            {step === 2 && (
              <>
                <Button
                  onClick={handleConfirmPayment}
                  disabled={isProcessing}
                  className="mt-6 w-full"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm Payment"
                  )}
                </Button>
                <Button
                  onClick={async () => {
                    if (!orderId) return;
                    setIsProcessing(true);
                    try {
                      const response = await fetch(`/api/orders/${orderId}/cancel`, {
                        method: "POST",
                      });
                      if (response.ok) {
                        clearCart();
                        router.push("/");
                      } else {
                        alert("Failed to cancel order");
                      }
                    } catch (error) {
                      console.error("Cancel error:", error);
                    }
                    setIsProcessing(false);
                  }}
                  variant="outline"
                  className="mt-4 w-full"
                >
                  Cancel Order
                </Button>
              </>
            )}
          </Card>
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

export default function CheckoutPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CheckoutContent />
    </Suspense>
  );
}
