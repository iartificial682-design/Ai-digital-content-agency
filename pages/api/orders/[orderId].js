import { db } from '../../../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { orderId } = req.query;

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    // Get order from Firestore
    const orderRef = doc(db, 'orders', orderId);
    const orderDoc = await getDoc(orderRef);

    if (!orderDoc.exists()) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const orderData = orderDoc.data();
    
    // Return order data (excluding sensitive information)
    const safeOrderData = {
      id: orderDoc.id,
      service: orderData.service,
      status: orderData.status,
      paymentStatus: orderData.paymentStatus,
      paymentAmount: orderData.paymentAmount,
      paymentCurrency: orderData.paymentCurrency,
      paymentMethod: orderData.paymentMethod,
      createdAt: orderData.createdAt,
      paidAt: orderData.paidAt,
      // Include other non-sensitive fields as needed
    };

    return res.status(200).json(safeOrderData);

  } catch (error) {
    console.error('Error fetching order:', error);
    return res.status(500).json({ error: 'Failed to fetch order details' });
  }
}