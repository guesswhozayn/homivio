import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil",
});

const headers = {
  "Content-Type": "application/json",
};

const calculateOrderAmount = (items) => {
  return 1400;
};

exports.handler = async function (event, context) {
  if (!event.body || event.httpMethod !== "POST") {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ status: "invalid http method" }),
    };
  }

  const order = JSON.parse(event.body);

  try {
    const intent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(order.items),
      currency: "pkr",
      payment_method: order.payment_method_id,
      confirm: true,
      error_on_requires_action: true,
    });

    if (intent.status === "succeeded") {
      const customer = await stripe.customers.create({
        payment_method: intent.payment_method,
        email: order.email,
        address: order.address,
      });

      console.log(`Created Payment: ${intent.id} for Customer: ${customer.id}`);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, paymentId: intent.id }),
      };
    } else {
      console.error("Unexpected status:", intent.status);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Unexpected status: " + intent.status }),
      };
    }
  } catch (e) {
    if (e.type && e.type.startsWith("Stripe")) {
      console.error("Stripe error:", e.message);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: e.message }),
      };
    }

    console.error("Unhandled error:", e);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
