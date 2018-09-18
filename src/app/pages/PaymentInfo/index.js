import React from "react";
import { View, SafeAreaView } from "react-native";
import styles from "./style";
import { Config, Colors, Constants } from "@common";
import { PaymentMethods, Button } from "@components";

import { connect } from "react-redux";
import { ActionCreators } from "@actions";
import { bindActionCreators } from "redux";
import * as ActionTypes from "@actions/ActionTypes";
import PayPal from "react-native-paypal-wrapper";
import RazorpayCheckout from "react-native-razorpay";
import stripe from "tipsi-stripe";
PayPal.initialize(Config.PayPal.Environment, Config.PayPal.ClientId);
stripe.setOptions({
  publishableKey: Config.Stripe.publishKey,
  merchantId: Config.Stripe.mechantId,
  androidPayMode: "test"
});
class PaymentInfo extends React.Component {
  state = {
    paymentMethod: null
  };

  render() {
    let { paymentMethods, type } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <PaymentMethods
            paymentMethods={paymentMethods}
            onSelectPaymentMethod={this.onSelectPaymentMethod}
          />
        </View>
        <Button
          title={__.t("Submit")}
          style={styles.btnSubmit}
          onPress={this.onSubmit}
          loading={type == ActionTypes.CREATE_ORDER_PENDING}
        />
      </SafeAreaView>
    );
  }

  onSelectPaymentMethod = item => {
    this.setState({ paymentMethod: item });
  };

  onSubmit = () => {
    let { paymentMethod } = this.state;
    let { shippingAddress, carts, shippingMethod, customerInfo } = this.props;

    if (paymentMethod == null) {
      alert("Please choose payment method.");
      return;
    }

    var line_items = [];
    carts.forEach(item => {
      line_items.push({
        product_id: item.id,
        quantity: item.qty
      });
    });

    var data = {
      payment_type: "",
      payment_method: paymentMethod.id,
      payment_method_title: paymentMethod.title,
      set_paid: false,
      billing: shippingAddress,
      shipping: shippingAddress,
      line_items: line_items,
      shipping_lines: [
        {
          method_id: shippingMethod.id,
          method_title: shippingMethod.title
        }
      ],
      customer_id: customerInfo.id
    };
    if (paymentMethod.id == "ppec_paypal") {
      PayPal.pay({
        price: `${this.getPriceTotal()}`,
        currency: Config.Currency.code,
        description: "Make payment from SOUK"
      })
        .then(confirm => {
          data.set_paid = true;
          this.props.createOrder(data);
        })
        .catch(error => {
          console.log(error);
        });
    } else if (paymentMethod.id == "razorpay") {
      let total = this.getPriceTotal() * Constants.USD_TO_INR;
      let options = {
        description: "Credits towards consultation",
        image: "https://i.imgur.com/3g7nmJC.png",
        currency: "INR",
        key: Config.RazorpayKey,
        amount: `${parseInt(total)}`,
        name: "Payment with razorpay",
        prefill: {
          email: customerInfo.email
        },
        theme: { color: Colors.AppColor }
      };
      RazorpayCheckout.open(options)
        .then(response => {
          //alert(`Success: ${response.razorpay_payment_id}`);
          data.set_paid = true;
          this.props.createOrder(data);
        })
        .catch(error => {
          alert(error.description);
          //alert(`Error: ${error.code} | ${error.description}`);
        });
    } else if (paymentMethod.id === "stripe") {
      let objPay = {
        smsAutofillDisabled: true,
        requiredBillingAddressFields: "full",
        prefilledInformation: {
          billingAddress: {
            name: customerInfo.last_name,
            line1: shippingAddress.address_1,
            city: shippingAddress.city,
            state: shippingAddress.state,
            country: shippingAddress.country,
            postalCode: shippingAddress.postcode,
            email: customerInfo.email
          }
        }
      };
      stripe
        .paymentRequestWithCardForm(objPay)
        .then(token => {
          data.set_paid = false;
          data.payment_type = "stripe";
          data.stripe_token = token.tokenId;
          data.status = "pending";
          this.props.createOrder(data);
        })
        .catch(err => {
          alert(err);
        });
    } else {
      this.props.createOrder(data);
    }
  };

  getPriceTotal = () => {
    var total = 0;
    this.props.carts.forEach(item => {
      total += item.price * item.qty;
    });
    return total;
  };

  componentWillReceiveProps(props) {
    if (
      props.type == ActionTypes.CREATE_ORDER_FAIL ||
      props.type == ActionTypes.PAYMENT_STRIPE_FAIL
    ) {
      alert(props.message);
    }

    if (props.type == ActionTypes.CREATE_ORDER_SUCCESS) {
      let orderInfo = props.orderInfo;
      if (orderInfo.payment_type === "stripe") {
        let dataStripe = {
          payment_method: "stripe",
          order_id: orderInfo.id,
          payment_token: orderInfo.stripe_token
        };
        this.props.paymentStripe(dataStripe);
      } else {
        alert(__.t("Done ! Thank you for your order."));
        this.props.showCarts();
      }
    }
    if (props.type == ActionTypes.PAYMENT_STRIPE_SUCCESS) {
      alert(__.t("Done ! Thank you for your order."));
      this.props.showCarts();
    }
  }
}

PaymentInfo.defaultProps = {
  paymentMethods: []
};

function mapStateToProps({ cartsReducers, authReducers }) {
  return {
    carts: cartsReducers.carts,
    type: cartsReducers.type,
    message: cartsReducers.message,
    paymentMethods: cartsReducers.paymentMethods,
    shippingAddress: cartsReducers.shippingAddress,
    shippingMethod: cartsReducers.shippingMethod,
    customerInfo: authReducers.customerInfo,
    orderInfo: cartsReducers.orderInfo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentInfo);
