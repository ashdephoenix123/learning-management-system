// import crypto from "crypto";
// import connectDB from "@/app/database/connection";
// import sgMail from '@sendgrid/mail'
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        console.log('1')
        const name = await request;
        console.log('2')
        console.log(name)
        console.log('3')
        return NextResponse.json({ access: true})
    } catch (error) {
        return NextResponse.json({ error: error.message })
    }

}

        // let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

        // const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEYSECRET).update(body.toString()).digest('hex');
        // if (expectedSignature === req.body.razorpay_signature) {
        //     await connectDB();
        //     const check = await Order.findOneAndUpdate({ orderID: req.body.razorpay_order_id }, { status: "Paid", paymentInfo: req.body, paymentID: req.body.razorpay_payment_id });
        //     sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        //     const msg = {
        //         to: check.email, // Change to your recipient
        //         from: {
        //             name: "Sharkk&Co.",
        //             email: 'mail@sharkk.studio'
        //         }, // Change to your verified sender
        //         subject: 'Order Confirmed',
        //         text: 'Your Order is confirmed!',
        //         html: `You have successfully Registered for our Course.`,
        //     }
        //     await sgMail.send(msg)
        //     Object.keys(check.products).map(async (item) => {
        //         await Product.findOneAndUpdate({ productId: item }, { $inc: { availableQty: -check.products[item].quantity } })
        //     })

        // }
        // res.redirect(`/order?id=${req.body.razorpay_order_id}&clearCart=true`)
