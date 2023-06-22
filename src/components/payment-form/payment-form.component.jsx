import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { countTotal } from "../../routes/checkout/checkout.component";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const { displayName } = useSelector((state) => state.user.data);
  const { product } = useSelector((state) => state);

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: countTotal(product) * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: displayName,
        },
      },
    });

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful");
      }
    }
  };

  return (
    <form onSubmit={paymentHandler}>
      <CardElement />
      <button className="text-black bg-slate-400 py-2 px-4 mt-6 font-bold" type="submit">
        Pay now
      </button>
    </form>
  );
}
