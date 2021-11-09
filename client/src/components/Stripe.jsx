import React from "react";
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

const Stripe = () => {
  return (
      <Elements stripe={stripePromise}>
        <CardForm />
      </Elements>
  );
};

export default Stripe;