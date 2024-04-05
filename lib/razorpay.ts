import Razorpay from 'razorpay'

export const instance = new Razorpay({
  key_id: process.env.RAZARPAY_ID!,
  key_secret: process.env.RAZARPAY_SECRET!,
})
