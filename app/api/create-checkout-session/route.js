import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, provider, packageName, price, duration } = body;

        const verifiedPrice = Number(price); // Later DB se verify karna

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: email,

            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `${provider} - ${packageName}`,
                            description: `Duration: ${duration}`,
                        },
                        unit_amount: verifiedPrice * 100,
                    },
                    quantity: 1,
                },
            ],

            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/cancel`,
        });

        return NextResponse.json({ url: session.url });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Stripe error" }, { status: 500 });
    }
}