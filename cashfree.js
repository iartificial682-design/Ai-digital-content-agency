import crypto from 'crypto';
import { db } from '../../../../utils/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { sendZapierWebhook } from '../../../../utils/zapier';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = req.body;
    const signature = req.headers['x-webhook-signature'];
    
    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.CASHFREE_WEBHOOK_SECRET)
      .update(JSON.stringify(payload))
      .digest('base64');

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const { order_id, payment_status, payment_amount, payment_currency } = payload.data;

    // Update order status in Firestore
    const orderRef = doc(db, 'orders', order_id);
    const orderDoc = await getDoc(orderRef);

    if (!orderDoc.exists()) {
      console.error('Order not found:', order_id);
      return res.status(404).json({ error: 'Order not found' });
    }

    const updateData = {
      paymentStatus: payment_status,
      paymentAmount: payment_amount,
      paymentCurrency: payment_currency,
      paymentMethod: 'cashfree',
      updatedAt: new Date().toISOString()
    };

    if (payment_status === 'SUCCESS') {
      updateData.status = 'paid';
      updateData.paidAt = new Date().toISOString();
    } else if (payment_status === 'FAILED') {
      updateData.status = 'payment_failed';
    }

    await updateDoc(orderRef, updateData);

    // Send Zapier webhook for payment completion
    if (payment_status === 'SUCCESS') {
      await sendZapierWebhook('payment', {
        orderId: order_id,
        amount: payment_amount,
        currency: payment_currency,
        status: 'completed',
        paymentMethod: 'cashfree',
        timestamp: new Date().toISOString()
      });
    }

    console.log(`Payment webhook processed for order ${order_id}: ${payment_status}`);
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Cashfree webhook error:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}