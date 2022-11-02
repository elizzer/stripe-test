import React ,{useEffect,useState} from 'react';
import{
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

function Checkout(){

    const stripe = useStripe();
    const elements = useElements();

    const [message,setMessage]=useState(null);
    const [isLoading,setIsLoading]=useState(false);

    useEffect(() => {
        if (!stripe) {
          return;
        }
    
        const clientSecret = new URLSearchParams(window.location.search).get(
          "payment_intent_client_secret"
        );
    
        if (!clientSecret) {
          return;
        }
    
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
          switch (paymentIntent.status) {
            case "succeeded":
              setMessage("Payment succeeded!");
              break;
            case "processing":
              setMessage("Your payment is processing.");
              break;
            case "requires_payment_method":
              setMessage("Your payment was not successful, please try again.");
              break;
            default:
              setMessage("Something went wrong.");
              break;
          }
        });
      }, [stripe]);
    

   async function submitHandler(e){
        e.preventDefault();
        if(!stripe||!elements){
            return
        }

        console.log('[+]Form submited ',stripe)

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams:{
                return_url:"http://localhost:3000/sucess_payment"
            }
        })
        if(error.message){
            console.log('[+]Error in stripe payment ',error.message)
        }
    }

    return(
        <div>
            { stripe &&

                <form onSubmit={submitHandler}>
                <PaymentElement/>
                <input type={"submit"}/>
                </form>
            }
        </div>
    );
}

export default Checkout
