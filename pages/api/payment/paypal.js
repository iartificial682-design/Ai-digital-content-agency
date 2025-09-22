export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { orderId, amount, currency = 'USD', orderDetails } = req.body;

    // Validate required fields
    if (!orderId || !amount || !orderDetails) {
      return res.status(400).json({ 
        error: 'Missing required fields: orderId, amount, orderDetails' 
      });
    }

    // Get PayPal access token
    const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');
    
    const tokenResponse = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    const tokenData = await tokenResponse.json();
    
    if (!tokenResponse.ok) {
      throw new Error('Failed to get PayPal access token');
    }

    // Create PayPal order
    const orderRequest = {
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: orderId,
        amount: {
          currency_code: currency,
          value: parseFloat(amount).toFixed(2)
        },
        description: orderDetails.description || `Payment for order ${orderId}`
      }],
      application_context: {
        return_url: `${process.env.NEXTAUTH_URL || 'http://localhost:12000'}/payment/success?orderId=${orderId}`,
        cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:12000'}/payment/cancel?orderId=${orderId}`,
        brand_name: process.env.COMPANY_NAME || 'Ganesh Digital Works Pvt Ltd',
        landing_page: 'BILLING',
        user_action: 'PAY_NOW'
      }
    };

    const orderResponse = await fetch('https://api-m.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderRequest)
    });

    const orderData = await orderResponse.json();
    
    if (orderResponse.ok && orderData.id) {
      const approveLink = orderData.links.find(link => link.rel === 'approve');
      
      return res.status(200).json({
        success: true,
        order_id: orderData.id,
        payment_url: approveLink?.href,
        status: orderData.status
      });
    } else {
      throw new Error(orderData.message || 'Failed to create PayPal order');
    }

  } catch (error) {
    console.error('PayPal payment error:', error);
    return res.status(500).json({ 
      error: 'Payment initialization failed',
      details: error.message 
    });
  }
}