import Link from "next/link";

export const metadata = {
  title: "Refund & Cancellation Policy - Baby Textiles",
  description:
    "Read Baby Textiles refund and cancellation policy. Learn about our return process, refund timelines, and cancellation terms.",
};

export default function RefundPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 lg:px-12">
      <h1 className="mb-8 text-3xl font-bold text-text-main md:text-4xl">
        Refund & Cancellation Policy
      </h1>

      <div className="space-y-8 text-text-sub">
        <section>
          <h2 className="mb-4 text-xl font-bold text-text-main">
            1. Introduction
          </h2>
          <p>
            At Baby Textiles, we are committed to ensuring your satisfaction
            with our products. This Refund & Cancellation Policy outlines the
            terms and conditions for returns, refunds, and order cancellations.
            By placing an order with us, you agree to the terms outlined in this
            policy.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-text-main">
            2. Order Cancellation
          </h2>

          <h3 className="mb-2 font-semibold text-text-main">
            2.1 Cancellation Before Shipment
          </h3>
          <p className="mb-4">
            You can cancel your order before it is shipped. To request a
            cancellation:
          </p>
          <ul className="ml-6 list-disc space-y-1">
            <li>
              Contact us at{" "}
              <span className="font-medium">amriteshanshu1234@gmail.com</span>{" "}
              with your order ID
            </li>
            <li>
              Call us at <span className="font-medium">+91 8603538436</span>{" "}
              during business hours (9:00 AM - 7:00 PM, Mon-Sat)
            </li>
          </ul>
          <p className="mt-2">
            Orders can be cancelled within 2 hours of placing the order,
            provided the order has not yet been processed for shipment.
          </p>

          <h3 className="mb-2 mt-4 font-semibold text-text-main">
            2.2 Cancellation After Shipment
          </h3>
          <p>
            Once an order has been shipped, cancellation is not possible.
            However, you may refuse the delivery at the time of arrival, and the
            package will be returned to us. Upon receipt of the returned
            package, we will process a refund as per our return policy.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-text-main">
            3. Return Policy
          </h2>

          <h3 className="mb-2 font-semibold text-text-main">
            3.1 Eligibility for Returns
          </h3>
          <p className="mb-2">
            We accept returns under the following conditions:
          </p>
          <ul className="ml-6 list-disc space-y-1">
            <li>
              Returns must be initiated within <strong>7 days</strong> of
              delivery for domestic orders
            </li>
            <li>
              Returns must be initiated within <strong>14 days</strong> of
              delivery for international orders
            </li>
            <li>Items must be unused, unwashed, and in original condition</li>
            <li>All original tags, labels, and packaging must be intact</li>
            <li>
              Proof of purchase (order confirmation email) must be provided
            </li>
          </ul>

          <h3 className="mb-2 mt-4 font-semibold text-text-main">
            3.2 Non-Returnable Items
          </h3>
          <p className="mb-2">The following items cannot be returned:</p>
          <ul className="ml-6 list-disc space-y-1">
            <li>Sale items or products purchased at discounted prices</li>
            <li>
              Customized or bespoke orders (orders made to specific
              requirements)
            </li>
            <li>Items that have been altered, tailored, or washed</li>
            <li>Inner wear, leggings, or hygiene-related products</li>
            <li>Gift cards or vouchers</li>
          </ul>

          <h3 className="mb-2 mt-4 font-semibold text-text-main">
            3.3 Textile-Specific Considerations
          </h3>
          <p>
            Due to the handcrafted nature of our textiles, minor variations in
            color, weave, pattern, and texture are not defects but are inherent
            characteristics of handloom products. These variations add to the
            uniqueness of each piece and are not eligible for returns.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-text-main">
            4. Return Process
          </h2>

          <h3 className="mb-2 font-semibold text-text-main">
            4.1 Initiating a Return
          </h3>
          <p className="mb-2">
            To initiate a return, please follow these steps:
          </p>
          <ol className="ml-6 list-decimal space-y-1">
            <li>
              Contact us at{" "}
              <span className="font-medium">amriteshanshu1234@gmail.com</span>{" "}
              with your order ID and reason for return
            </li>
            <li>
              Our team will review your request within 24-48 business hours
            </li>
            <li>
              If approved, we will provide you with a return shipping label or
              return instructions
            </li>
            <li>
              Pack the item securely in original packaging with all tags intact
            </li>
            <li>
              Ship the item within 3 days of receiving return instructions
            </li>
          </ol>

          <h3 className="mb-2 mt-4 font-semibold text-text-main">
            4.2 Return Shipping
          </h3>
          <ul className="ml-6 list-disc space-y-1">
            <li>
              For returns due to our error (wrong item, defective product), Baby
              Textiles will bear the return shipping cost
            </li>
            <li>
              For returns due to customer preference (color, size, etc.), the
              customer is responsible for return shipping costs
            </li>
            <li>We recommend using a trackable shipping method for returns</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-text-main">
            5. Refund Policy
          </h2>

          <h3 className="mb-2 font-semibold text-text-main">
            5.1 Refund Processing Time
          </h3>
          <ul className="ml-6 list-disc space-y-1">
            <li>
              Once we receive your returned item, we will inspect and verify the
              product within 3-5 business days
            </li>
            <li>
              After verification and approval of the return, the refund shall be
              initiated in the customer&apos;s bank account within 7-10 business
              days
            </li>
            <li>The refund will be credited to the customer&apos;s bank account</li>
          </ul>

          <h3 className="mb-2 mt-4 font-semibold text-text-main">
            5.2 Refund Methods
          </h3>
          <ul className="ml-6 list-disc space-y-1">
            <li>
              <strong>Online Payments:</strong> Refund will be credited to the
              customer&apos;s bank account
            </li>
            <li>
              <strong>Cash on Delivery (COD):</strong> Refund will be processed
              via bank transfer to the customer&apos;s provided account details
            </li>
            <li>
              <strong>Gift Cards:</strong> Refunds can be issued as store credit
              or gift cards upon request
            </li>
          </ul>

          <h3 className="mb-2 mt-4 font-semibold text-text-main">
            5.3 Partial Refunds
          </h3>
          <p>The following situations may qualify for partial refunds:</p>
          <ul className="ml-6 list-disc space-y-1">
            <li>
              Items returned after the return window (late returns may receive
              partial store credit)
            </li>
            <li>Items not in original condition or missing parts</li>
            <li>
              Original shipping charges are non-refundable unless the return is
              due to our error
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-text-main">
            6. Exchange Policy
          </h2>
          <p className="mb-2">
            We offer exchanges under the following conditions:
          </p>
          <ul className="ml-6 list-disc space-y-1">
            <li>
              Exchanges are subject to availability of the desired product
            </li>
            <li>
              Color exchanges are subject to dye lot variations in handcrafted
              items
            </li>
            <li>
              Size exchanges are subject to availability of the requested size
            </li>
            <li>
              The customer is responsible for shipping costs for exchanges
            </li>
            <li>Price differences will be adjusted in case of size upgrades</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-text-main">
            7. Damaged or Defective Products
          </h2>
          <p className="mb-2">
            If you receive a damaged or defective product, please contact us
            immediately:
          </p>
          <ul className="ml-6 list-disc space-y-1">
            <li>
              Email us at{" "}
              <span className="font-medium">support@babytextiles.com</span> with
              photos of the damage
            </li>
            <li>Include your order ID and a description of the issue</li>
            <li>
              We will arrange for a replacement or full refund at no extra cost
            </li>
            <li>
              Claims for damaged products must be reported within 48 hours of
              delivery
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-text-main">
            8. International Orders
          </h2>
          <p className="mb-2">For international orders, please note:</p>
          <ul className="ml-6 list-disc space-y-1">
            <li>
              Return shipping costs are the responsibility of the customer
            </li>
            <li>Customs duties and taxes are non-refundable</li>
            <li>
              International returns may take longer to process due to customs
              clearance
            </li>
            <li>
              Refunds will be issued in INR, converted at the exchange rate at
              the time of refund
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-text-main">
            9. Contact Information
          </h2>
          <p>
            For any questions or concerns regarding returns, refunds, or
            cancellations, please contact us:
          </p>
          <div className="mt-4 rounded-lg bg-neutral-light p-4">
            <p>
              <strong>Baby Textiles</strong>
              <br />
              Prop. Pradim Kumar Sah
            </p>
            <p>Email: amriteshanshu1234@gmail.com</p>
            <p>Phone: +91 8603538436</p>
            <p>Business Hours: Monday - Saturday, 9:00 AM - 7:00 PM</p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-text-main">
            10. Policy Updates
          </h2>
          <p>
            We reserve the right to modify this Refund & Cancellation Policy at
            any time. Any changes will be posted on this page with a revised
            &quot;Last Updated&quot; date. Your continued use of our website
            constitutes acceptance of any changes.
          </p>
        </section>

        <p className="pt-8 text-sm text-text-sub">
          Last updated: February 2026
        </p>
      </div>
    </div>
  );
}
