/* eslint-disable import/prefer-default-export */
import Stripe from 'stripe';
import { Request, Response } from 'express';
import User, { IUserDocument } from '@src/models/user.model';
import Cart, { ICartDocument } from '@src/models/cart.model';
import { ApiResponse, catchAsync } from '@src/utils/api.utils';
import ApiError from '@src/errors/api-error';
import { OrderService, ProductService } from '@src/services';
import config from '@src/config';
import { IProduct, IProductDocument } from '@src/models/product.model';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export const createPaymentIntent = async (req: Request, res: Response) => {
  const { isCouponApplied } = req.body;

  // Get user to retrieve user._id from DB, firebase auth middleware may not have
  // the users db _id
  const user: IUserDocument | null = await User.findOne({
    email: req.user.email,
  }).exec();

  // 2 get user cart total
  const cart: ICartDocument | null = await Cart.findOne({
    orderedBy: user?._id,
  }).exec();

  if (!cart) {
    return res.status(400).send({});
  }

  let finalAmount = 0;
  const { totalAfterDiscount, totalAmount } = cart;
  if (isCouponApplied && totalAfterDiscount) {
    finalAmount = totalAfterDiscount * 100;
  } else {
    finalAmount = totalAmount * 100;
  }

  // create payment intent with order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: 'usd',
  });

  console.log(paymentIntent);

  return res.send({
    clientSecret: paymentIntent.client_secret,
    totalAmount,
    totalAfterDiscount,
    payable: finalAmount,
  });
};

export const checkout = catchAsync(async (req: Request, res: Response) => {
  const { cart } = (await req.body) as {
    cart: { items: (IProduct & { id: string; quantity: number })[] };
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return new ApiError(400, 'Please select valid products');
  }

  const products = await ProductService.list({
    _id: {
      $in: cart.items.map((item: any) => item.id),
    },
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach(product => {
    const cartItem = cart.items.find(item => item.id === product.id);
    console.log(cartItem);
    if (cartItem) {
      line_items.push({
        quantity: cartItem.quantity,
        price_data: {
          currency: 'USD',
          product_data: {
            name: product.title,
          },
          unit_amount: +(product.price * 100).toFixed(2),
        },
      });
    }
  });

  const newOrder = await OrderService.create({
    isPaid: false,
    products: products.map(product => ({
      product: product.id,
      quantity: 0,
      color: '',
    })),
    createdBy: req.user,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${config.clientBaseUrl}/cart?success=1`,
    cancel_url: `${config.clientBaseUrl}/cart?canceled=1`,
    metadata: {
      orderId: newOrder.id,
    },
  });

  res.json(
    new ApiResponse('Checkout session created successfully', {
      url: session.url,
    })
  );
});


// import Stripe from 'stripe';
// import { headers } from 'next/headers';
// import { NextResponse } from 'next/server';

// import { stripe } from '@/lib/stripe';
// import prismaClient from '@/lib/prisma';

// export async function POST(req: Request) {
//   const body = await req.text();
//   const signature = headers().get('Stripe-Signature') as string;

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//   } catch (error: any) {
//     return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
//   }

//   const session = event.data.object as Stripe.Checkout.Session;
//   const address = session?.customer_details?.address;

//   const addressComponents = [
//     address?.line1,
//     address?.line2,
//     address?.city,
//     address?.state,
//     address?.postal_code,
//     address?.country,
//   ];

//   const addressString = addressComponents.filter(c => c !== null).join(', ');

//   if (event.type === 'checkout.session.completed') {
//     await prismaClient.order.update({
//       where: {
//         id: session?.metadata?.orderId,
//       },
//       data: {
//         isPaid: true,
//         address: addressString,
//         phone: session?.customer_details?.phone || '',
//       },
//     });
//   }

//   return new NextResponse(null, { status: 200 });
// }
