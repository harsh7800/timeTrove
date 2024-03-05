import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    email: { type: String, require: true },
    phone: { type: String, require: true },
    orderId: { type: String, require: true },
    paymentInfo: { type: Object, default: {} },
    products: {
      type: Object,
      required: true,
    },

    address: { type: String, require: true },
    amount: { type: Number, require: true },
    status: { type: String, default: "Initiated", require: true },
  },
  { timestamps: true }
);

// {
//     id: 'pay_NP9JRBpS0XBun3',
//     entity: 'payment',
//     amount: 284800,
//     currency: 'INR',
//     status: 'captured',
//     order_id: 'order_NP9JFI1Ksqx8eF',
//     invoice_id: null,
//     international: false,
//     method: 'card',
//     amount_refunded: 0,
//     refund_status: null,
//     captured: true,
//     description: 'Thankyou for your test donation',
//     card_id: 'card_NP9JRGOs34UcWo',
//     card: {
//       id: 'card_NP9JRGOs34UcWo',
//       entity: 'card',
//       name: '',
//       last4: '1111',
//       network: 'Visa',
//       type: 'debit',
//       issuer: null,
//       international: false,
//       emi: false,
//       sub_type: 'consumer',
//       token_iin: null
//     },
//     bank: null,
//     wallet: null,
//     vpa: null,
//     email: 'timetrove@shop.com',
//     contact: '+917020098227',
//     notes: { key1: 'payment_attempted' },
//     fee: 6722,
//     tax: 1026,
//     error_code: null,
//     error_description: null,
//     error_source: null,
//     error_step: null,
//     error_reason: null,
//     acquirer_data: { auth_code: '739726' },
//     created_at: 1705378692
//   }
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
