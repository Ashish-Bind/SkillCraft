import { instance } from '@/lib/razorpay'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { price } = await req.json()

    const options = {
      amount: price * 100,
      currency: 'INR',
      receipt: 'receipt#1',
    }

    const order = await instance.orders.create(options)
    return NextResponse.json(order)
  } catch (err) {
    console.log('CHECKOUT_ERR', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
