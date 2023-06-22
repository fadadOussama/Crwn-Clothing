import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
