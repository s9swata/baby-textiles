import { Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Contact Us - Baby Textiles",
  description:
    "Get in touch with Baby Textiles. We are here to help with your queries about our silk sarees and home linen products.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:px-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-bold text-text-main md:text-4xl">
          Contact Us
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-text-sub">
          We would love to hear from you. Get in touch for any queries or
          support.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h2 className="mb-4 text-xl font-bold text-text-main">
              Get In Touch
            </h2>
            <p className="text-text-sub">
              Have questions about our products? Need help with an order? Our
              team is here to assist you. Reach out to us through any of the
              channels below or fill out the contact form.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-text-main">Address</h3>
                <p className="text-text-sub">
                  Prop. Pradim Kumar Sah
                  <br />
                  Baby Textiles
                  <br />
                  Hussainabad, Bhagalpur, Bihar
                  <br />
                  India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-text-main">Phone</h3>
                <p className="text-text-sub">
                  +91 8603538436
                  <br />
                  Mon - Sat: 9:00 AM - 7:00 PM
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-text-main">Email</h3>
                <p className="text-text-sub">amriteshanshu1234@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-text-main">Business Hours</h3>
                <p className="text-text-sub">
                  Monday - Saturday: 9:00 AM - 7:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-text-main">
              Follow Us on Social Media
            </h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition hover:bg-primary hover:text-white"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition hover:bg-primary hover:text-white"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition hover:bg-primary hover:text-white"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition hover:bg-primary hover:text-white"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-xl font-bold text-text-main">
            Send Us a Message
          </h2>
          <form
            action="https://formsubmit.co/amriteshanshu1234@gmail.com"
            method="POST"
            className="space-y-4"
          >
            <input
              type="hidden"
              name="_subject"
              value="New Contact Form Submission - Baby Textiles"
            />
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="_honey" style={{ display: "none" }} />

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-1 block text-sm font-medium text-text-main"
                >
                  First Name
                </label>
                <Input
                  id="firstName"
                  name="first_name"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-1 block text-sm font-medium text-text-main"
                >
                  Last Name
                </label>
                <Input
                  id="lastName"
                  name="last_name"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-text-main"
              >
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-1 block text-sm font-medium text-text-main"
              >
                Phone Number (Optional)
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-1 block text-sm font-medium text-text-main"
              >
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="">Select a topic</option>
                <option value="Order Related Query">Order Related Query</option>
                <option value="Product Inquiry">Product Inquiry</option>
                <option value="Returns & Refunds">Returns & Refunds</option>
                <option value="Bulk Orders / Wholesale">
                  Bulk Orders / Wholesale
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1 block text-sm font-medium text-text-main"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="How can we help you?"
                className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                required
              />
            </div>

            <Button className="w-full" size="lg">
              Send Message
            </Button>
          </form>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-text-main">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-neutral-light p-6">
            <h3 className="mb-2 font-semibold text-text-main">
              What are your shipping times?
            </h3>
            <p className="text-text-sub">
              We ship within 2-3 business days. Standard delivery takes 5-7 days
              within India. International shipping takes 10-21 days.
            </p>
          </div>
          <div className="rounded-xl bg-neutral-light p-6">
            <h3 className="mb-2 font-semibold text-text-main">
              Do you offer international shipping?
            </h3>
            <p className="text-text-sub">
              Yes, we ship to select international locations. Customs duties and
              taxes may apply and are the responsibility of the customer.
            </p>
          </div>
          <div className="rounded-xl bg-neutral-light p-6">
            <h3 className="mb-2 font-semibold text-text-main">
              How do I track my order?
            </h3>
            <p className="text-text-sub">
              Once your order is shipped, you will receive a tracking number via
              email and SMS. You can also track it from your account.
            </p>
          </div>
          <div className="rounded-xl bg-neutral-light p-6">
            <h3 className="mb-2 font-semibold text-text-main">
              Can I customize my order?
            </h3>
            <p className="text-text-sub">
              Yes, we offer customization for certain products. Please contact
              us with your requirements for a quote.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
