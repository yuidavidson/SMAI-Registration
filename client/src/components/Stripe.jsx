import React, { useEffect, useState} from "react";
import ReactDOM from "react-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter } from "react-router-dom";

import CardForm from "./CardForm.jsx";
import key from '../config.js';

import "../../dist/styles.css";

// const stripePromise = loadStripe(key.stripe.live);w

const stripePromise = loadStripe(key.stripe.test);

const demos = [
  {
    path: "/card-element",
    label: "CardElement",
    component: CardForm
  },
];

const Stripe = (props) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://smai.us/api/payment/intent", {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm switchStep={props.switchStep}/>
        </Elements>
    )}
    </div>

      // <Elements options={options} stripe={stripePromise}>
      //   <CardForm switchStep={props.switchStep}/>
      // </Elements>
  );
};

export default Stripe;