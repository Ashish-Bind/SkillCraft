import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = await req.json()
    const sign = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSign = crypto
      .createHmac('sha256', 'NtbwVHa62ocXkL8Jpfzn0X0q')
      .update(sign.toString())
      .digest('hex')

    if (razorpay_signature === expectedSign) {
      const purchase = await db.purchase.create({
        data: {
          userId,
          courseId,
        },
      })
      return new NextResponse('Payment Verified', { status: 200 })
    } else {
      return new NextResponse('Invalid Signature', { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error!' })
  }
}
