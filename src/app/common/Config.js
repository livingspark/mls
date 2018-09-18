import { Dimensions } from "react-native";
import Icons from "./Icons";
import PayPal from "react-native-paypal-wrapper";

const Config = {
  WoocommerceConfig: {
    endpoint: "https://hubay.net/wordpress",
    consumer_key: "ck_9d13ee9988b0587d0de0009a6488867ee0f7c92b",
    consumer_secret: "cs_35ae33d62b8a0a3418aa6ccf9e5296f1bf4a8424"
  },
  Promotions: [
    {
      image: "http://hubay.net/hubaywoo/2.1.0/banner1.jpg",
      categoryId: 223
    },
    {
      image: "http://hubay.net/hubaywoo/2.1.0/banner2.jpg",
      categoryId: 222
    },
    {
      image: "http://hubay.net/hubaywoo/2.1.0/banner3.jpg",
      categoryId: 224
    }
  ],
  Brands: [
    {
      url: "https://hubay.net/wordpress",
      image: "https://hubay.net/wordpress/img/brand3.gif"
    },
    {
      url: "https://hubay.net/wordpress",
      image: "https://hubay.net/wordpress/img/brand2.gif"
    },
    {
      url: "https://hubay.net/wordpress",
      image: "https://hubay.net/wordpress/img/Shop1.jpg"
    },
    {
      url: "https://hubay.net/wordpress",
      image: "https://hubay.net/wordpress/img/brand1.gif"
    }
  ],
  PayPal: {
    Environment: PayPal.SANDBOX, //PayPal.PRODUCTION
    ClientId:
      "AQMnlPwVOrcnwowKy_Xh6DCb7sLqNxumYcsG0YiBs0IMMOLD_1I-Ve7bs729H4LQSmW723BOl-qg40ba"
  },
  OneSignalAppId: "341a03aa-c95a-45b4-b2df-5be1d09583cc",
  EnabledDoken: true,
  RazorpayKey: "rzp_test_1oesWLG5iUkyFQ",
  Currency: {
    code: "USD",
    symbol: "$"
  },
  Stripe: {
    publishKey: "pk_test_EHYLrkLnAIRha2TMvk1EPjFm",
    secretKey: "sk_test_sIn4CfdCLQ8ywIFFD5z2I5QJ",
    mechantId: "123"
  }
};

export default Config;
