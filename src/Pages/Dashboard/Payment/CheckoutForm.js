import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

//stripe loading by pk
const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);
console.log(stripePromise);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit =async(event)=>{
        event.preventDefault();
        if(!stripe || !elements){
            //stripe.js has not ready yeat
            return;
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;