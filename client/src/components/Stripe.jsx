import React, { useEffect, useState} from "react";
import ReactDOM from "react-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter } from "react-router-dom";

import CardForm from "./CardForm.jsx";
import key from '../config.js';

import "../../dist/styles.css";

// LIVE: key for live usage
// const stripePromise = loadStripe(key.stripe.live);w

// TEST: key for testing
const stripePromise = loadStripe(key.stripe.test);

const Stripe = (props) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://smai.us/index.php?option=com_smapi&api=payment/intent", {
        method: "POST",
      })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.data.client_secret));
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
          <CardForm switchStep={props.switchStep} clientSecret={clientSecret}/>
        </Elements>
      )}
    </div>
  );
};

export default Stripe;