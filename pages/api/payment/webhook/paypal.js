import { db } from '../../../../utils/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { sendZapierWebhook } from '../../../../utils/zapier';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = req.body;
    
    // Verify PayPal webhook (simplified - in production, verify signature)
    const { event_type, resource } = payload;

    if (event_type === 'CHECKOUT.ORDER.APPROVED' || event_type === 'PAYMENT.CAPTURE.COMPLETED') {
      const orderId = resource.purchase_units?.[0]?.reference_id;
      const amount = resource.purchase_units?.[0]?.amount?.value;
      const currency = resource.purchase_units?.[0]?.amount?.currency_code;

      if (!orderId) {
        console.error('No order ID found in PayPal webhook');
        return res.status(400).json({ error: 'No order ID found' });
      }

      // Update order status in Firestore
      const orderRef = doc(db, 'orders', orderId);
      const orderDoc = await getDoc(orderRef);

      if (!orderDoc.exists()) {
        console.error('Order not found:', orderId);
        return res.status(404).json({ error: 'Order not found' });
      }

      const updateData = {
        paymentStatus: 'SUCCESS',
        paymentAmount: amount,
        paymentCurrency: currency,
        paymentMethod: 'paypal',
        paypalOrderId: resource.id,
        status: 'paid',
        paidAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await updateDoc(orderRef, updateData);

      // Send Zapier webhook for payment completion
      await sendZapierWebhook('payment', {
        orderId: orderId,
        amount: amount,
        currency: currency,
        status: 'completed',
        paymentMethod: 'paypal',
        paypalOrderId: resource.id,
        timestamp: new Date().toISOString()
      });

      console.log(`PayPal payment completed for order ${orderId}`);
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('PayPal webhook error:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}