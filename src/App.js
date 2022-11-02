import React from 'react';
import Checkout from "./checkout"; 
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';

import { useEffect, useState } from "react";
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51LLQ4iSCGq7Npknc2kLhApqo8xtRLE49olppRQ7yf9LXxyuq96tuefEkppT1k6SfjcGvnLqe7ERFUTj9rMASR1ZX00vQTHInqE')
function App() {
  const [clientSecret, setClientSecret]=useState("");
  
  useEffect(()=>{
    axios({
      method:"get",
      headers:{'content-type':"application/json","Access-Control-Allow-Origin": "*"},
      url:"http://127.0.0.1:6030/api/v1/flight/paymentSuccess/63620f8f4db79ca67a1d5ae6",
      
    }).then((res)=>{
      console.log('[+]Response ',res)
      setClientSecret(res.data.paymentIntents)
    })
  },[])

  const appearance={
    theam:'stripe'
  };
  const options={
    clientSecret,
    appearance
  }
  console.log('[+]Clientsecret ',clientSecret)
  return (
      <div>
        {
          clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <Checkout/>
            </Elements>
          )
        }
      </div>
  );
}

export default App