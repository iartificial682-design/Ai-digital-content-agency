import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { collection, query, where, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { notifyNewOrder } from '../utils/zapier';
import OrderForm from '../components/OrderForm';
import OrderCard from '../components/OrderCard';
import toast from 'react-hot-toast';
import { Plus, FileText, Clock, CheckCircle, DollarSign } from 'lucide-react';

export default function Dashboard({ user }) {
  const [orders, setOrders] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    totalSpent: 0
  });
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Set a timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        console.warn('Dashboard loading timeout - Firebase may not be configured');
        setIsLoading(false);
        toast.error('Unable to connect to database. Please check Firebase configuration.');
      }
    }, 10000); // 10 second timeout

    try {
      // Subscribe to user's orders
      const ordersQuery = query(
        collection(db, 'orders'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
        clearTimeout(loadingTimeout);
        const ordersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setOrders(ordersData);
        
        // Calculate stats
        const newStats = {
          total: ordersData.length,
          pending: ordersData.filter(o => o.status === 'pending').length,
          inProgress: ordersData.filter(o => o.status === 'in_progress').length,
          completed: ordersData.filter(o => o.status === 'completed').length,
          totalSpent: ordersData.reduce((sum, o) => sum + (o.estimatedPrice || 0), 0)
        };
        
        setStats(newStats);
        setIsLoading(false);
      }, (error) => {
        clearTimeout(loadingTimeout);
        console.error('Error fetching orders:', error);
        toast.error('Unable to load orders. Please check Firebase configuration.');
        setIsLoading(false);
      });

      return () => {
        clearTimeout(loadingTimeout);
        unsubscribe();
      };
    } catch (error) {
      clearTimeout(loadingTimeout);
      console.error('Firebase initialization error:', error);
      toast.error('Database connection failed. Please check Firebase setup.');
      setIsLoading(false);
    }
  }, [user, router, isLoading]);

  const handleOrderSubmit = async (orderData) => {
    try {
      const newOrder = {
        ...orderData,
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || 'Unknown User',
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'orders'), newOrder);
      
      // Notify via Zapier
      try {
        await notifyNewOrder({
          orderId: docRef.id,
          ...newOrder
        });
      } catch (zapierError) {
        console.error('Zapier notification failed:', zapierError);
      }

      toast.success('Order placed successfully!');
      setShowOrderForm(false);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  const handleDownload = (order) => {
    // In a real implementation, this would download the actual file
    toast.success('Download started!');
    console.log('Downloading order:', order.id);
  };

  const handlePreview = (order) => {
    // In a real implementation, this would show a preview modal
    toast.info('Preview feature coming soon!');
    console.log('Previewing order:', order.id);
  };

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - AI Digital Agency</title>
        <meta name="description" content="Manage your AI content orders and projects" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user.displayName?.split(' ')[0] || 'User'}!
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your AI content orders and track your projects.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.inProgress}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.completed}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-semibold text-gray-900">${stats.totalSpent}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Your Orders</h2>
            <button
              onClick={() => setShowOrderForm(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Order</span>
            </button>
          </div>

          {/* Order Form Modal */}
          {showOrderForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Place New Order</h3>
                    <button
                      onClick={() => setShowOrderForm(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <OrderForm onSubmit={handleOrderSubmit} />
                </div>
              </div>
            </div>
          )}

          {/* Orders List */}
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-6">
                Get started by placing your first order for AI-generated content.
              </p>
              <button
                onClick={() => setShowOrderForm(true)}
                className="btn-primary"
              >
                Place Your First Order
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onDownload={handleDownload}
                  onPreview={handlePreview}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}