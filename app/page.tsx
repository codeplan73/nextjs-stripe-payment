"use client";

import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY env variable");
}

export default function Home() {
  const amount = 23.99;

  return (
    <main className="max-w-6xl p-10 m-10 mx-auto text-center text-white border rounded-md bg-gradient-to-tr from-blue-500 to-purple-700">
      <div className="mb-10">
        <h1 className="mb-2 text-4xl font-extrabold">Emmanuel Omonzebaguan</h1>
        <h2 className="text-2xl">Has requested</h2>
        <span className="font-bold">${amount}</span>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </main>
  );
}
