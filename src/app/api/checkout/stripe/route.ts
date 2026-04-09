import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey || secretKey === "sk_test_COLLE_TA_CLE_ICI") {
    return NextResponse.json(
      { error: "Stripe non configuré — ajoutez STRIPE_SECRET_KEY dans .env.local" },
      { status: 503 }
    );
  }

  const stripe = new Stripe(secretKey, { apiVersion: "2025-02-24.acacia" });

  try {
    const body = await req.json();
    const { amount, items, pickupTime, note } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Montant invalide" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // en centimes
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        pickup_time: pickupTime ?? "",
        note: note ?? "",
        items: JSON.stringify(
          (items ?? []).map((i: { name: string; quantity: number }) => ({
            name: i.name,
            qty: i.quantity,
          }))
        ),
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur Stripe";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
