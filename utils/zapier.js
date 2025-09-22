import axios from 'axios';

// Zapier webhook integration for automation
export const sendToZapier = async (webhookUrl, data) => {
  try {
    const response = await axios.post(webhookUrl, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error sending data to Zapier:', error);
    throw error;
  }
};

// Send order notification
export const notifyNewOrder = async (orderData) => {
  const webhookUrl = process.env.ZAPIER_NEW_ORDER_WEBHOOK;
  if (!webhookUrl) {
    console.warn('Zapier webhook URL not configured for new orders');
    return;
  }

  try {
    await sendToZapier(webhookUrl, {
      event: 'new_order',
      order: orderData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to notify Zapier about new order:', error);
  }
};

// Send order completion notification
export const notifyOrderComplete = async (orderData) => {
  const webhookUrl = process.env.ZAPIER_ORDER_COMPLETE_WEBHOOK;
  if (!webhookUrl) {
    console.warn('Zapier webhook URL not configured for order completion');
    return;
  }

  try {
    await sendToZapier(webhookUrl, {
      event: 'order_complete',
      order: orderData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to notify Zapier about order completion:', error);
  }
};

// Send user registration notification
export const notifyUserRegistration = async (userData) => {
  const webhookUrl = process.env.ZAPIER_USER_REGISTRATION_WEBHOOK;
  if (!webhookUrl) {
    console.warn('Zapier webhook URL not configured for user registration');
    return;
  }

  try {
    await sendToZapier(webhookUrl, {
      event: 'user_registration',
      user: userData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to notify Zapier about user registration:', error);
  }
};

// Send payment notification
export const notifyPayment = async (paymentData) => {
  const webhookUrl = process.env.ZAPIER_PAYMENT_WEBHOOK;
  if (!webhookUrl) {
    console.warn('Zapier webhook URL not configured for payments');
    return;
  }

  try {
    await sendToZapier(webhookUrl, {
      event: 'payment_received',
      payment: paymentData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to notify Zapier about payment:', error);
  }
};

// Generic automation trigger
export const triggerAutomation = async (eventType, data) => {
  const webhookUrl = process.env.ZAPIER_GENERIC_WEBHOOK;
  if (!webhookUrl) {
    console.warn('Zapier generic webhook URL not configured');
    return;
  }

  try {
    await sendToZapier(webhookUrl, {
      event: eventType,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`Failed to trigger automation for ${eventType}:`, error);
  }
};

// Alias for backward compatibility
export const sendZapierWebhook = sendToZapier;