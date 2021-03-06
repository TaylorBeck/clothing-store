import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

import { clearCart } from '../../redux/cart/cart.actions';

const StripeCheckoutButton = ({ price, match, history, clearCart }) => {
  const priceForStripe = price * 100; // Stripe takes the USD price amount in cents
  const publishableKey = 'pk_test_3hjpLOVYQu3Sv3woQzNZYPJK00PFuGJnye';

  const onToken = token => {
    axios.post('payment', {
      token,
      amount: priceForStripe
    })
    .then(response => {
      console.log('SUCCESSFUL PAYMENT RESPONSE: ', response);
      // Successful Payment, let's proceed
      // Set delivery date to 7 days from now
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 7);

      const checkoutState = {
        token,
        price,
        deliveryDate
      };

      clearCart();
      history.push(`${match.url}/complete`, checkoutState);
    })
    .catch(error => {
      console.log('Payment Error: ', JSON.parse(error));
      alert('PAYMENT ERROR: Please use the credit card info displayed on the cart page.');
    });
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='FreedomFit'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/Ups.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  clearCart: () => dispatch(clearCart())
});

export default connect(null, mapDispatchToProps)(withRouter(StripeCheckoutButton));
// For list of StripeCheckout params, see: https://github.com/azmenak/react-stripe-checkout
