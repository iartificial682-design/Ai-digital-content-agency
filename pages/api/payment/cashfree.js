export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { orderId, amount, customerDetails, orderDetails } = req.body;

    // Validate required fields
    if (!orderId || !amount || !customerDetails || !orderDetails) {
      return res.status(400).json({ 
        error: 'Missing required fields: orderId, amount, customerDetails, orderDetails' 
      });
    }

    // Create Cashfree payment session
    const cashfreeRequest = {
      order_id: orderId,
      order_amount: parseFloat(amount),
      order_currency: "INR",
      customer_details: {
        customer_id: customerDetails.id,
        customer_name: customerDetails.name,
        customer_email: customerDetails.email,
        customer_phone: customerDetails.phone
      },
      order_meta: {
        return_url: `${process.env.NEXTAUTH_URL || 'http://localhost:12000'}/payment/success?orderId=${orderId}`,
        notify_url: `${process.env.NEXTAUTH_URL || 'http://localhost:12000'}/api/payment/webhook/cashfree`
      },
      order_note: orderDetails.description || `Payment for order ${orderId}`
    };

    // Make API call to Cashfree
    const response = await fetch('https://api.cashfree.com/pg/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': process.env.CASHFREE_APP_ID,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY,
        'x-api-version': '2023-08-01'
      },
      body: JSON.stringify(cashfreeRequest)
    });

    const data = await response.json();
    
    if (response.ok && data.payment_session_id) {
      return res.status(200).json({
        success: true,
        payment_session_id: data.payment_session_id,
        order_id: data.order_id,
        payment_url: `https://payments.cashfree.com/pay/${data.payment_session_id}`
      });
    } else {
      throw new Error(data.message || 'Failed to create payment session');
    }

  } catch (error) {
    console.error('Cashfree payment error:', error);
    return res.status(500).json({ 
      error: 'Payment initialization failed',
      details: error.message 
    });
  }
}