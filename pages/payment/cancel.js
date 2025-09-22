import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PaymentCancel() {
  const router = useRouter();
  const { orderId } = router.query;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
            <p className="text-gray-600">Your payment was cancelled. No charges have been made to your account.</p>
          </div>

          {orderId && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-2">Order Information</h2>
              <p className="text-gray-600">Order ID: <span className="font-semibold">{orderId}</span></p>
              <p className="text-sm text-gray-500 mt-2">This order is still pending payment</p>
            </div>
          )}

          <div className="space-y-4">
            <p className="text-gray-600">
              Don't worry! Your order is still saved and you can complete the payment anytime.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/dashboard"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Retry Payment
              </Link>
              
              <Link 
                href="/"
                className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">Need Assistance?</h3>
            <p className="text-sm text-yellow-800">
              If you're experiencing issues with payment, our support team is here to help.
            </p>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>Contact Support: {process.env.SUPPORT_EMAIL || 'ganeshworkspvtltd@gmail.com'}</p>
            <p>Phone: {process.env.SUPPORT_CONTACT || '+919234906001'}</p>
            <p>Telegram: {process.env.TELEGRAM_SUPPORT || '@amanjee7568'}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}