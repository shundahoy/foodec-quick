"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const stripe = require("stripe")(
  "sk_test_51LIVK7EWEmoGUrLEkRBGPxTzmxDEagDcq2Sesov76ERhyYdCn8dkdqvzZDLjmWhrMfenf8GbenQSeVtAKg9Zxrj200zI4XbeXR"
);

// `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token

module.exports = {
  create: async (ctx) => {
    const { address, amount, dishes, token } = JSON.parse(ctx.request.body);
    const charge = await stripe.charges.create({
      amount: amount,
      currency: "jpy",
      source: token,
      description: `Order ${new Date()} by ${ctx.state.user._id}`,
    });
    const order = await strapi.services.order.create({
      user: ctx.state.user._id,
      charge_id: charge.id,
      amount: amount,
      address,
      dishes,
    });
    return order;
  },
};
