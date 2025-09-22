import { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

// Admin email - only this email can access admin panel
const ADMIN_EMAIL = 'ganeshworkspvtltd@gmail.com';

export const isAdmin = async (user) => {
  if (!user || !user.email) return false;
  
  // Check if user email matches admin email
  if (user.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return false;
  }

  try {
    // Additional check in Firestore for admin role
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.role === 'admin' && userData.email === ADMIN_EMAIL;
    }
    return false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

export const requireAdmin = async (user) => {
  const adminStatus = await isAdmin(user);
  if (!adminStatus) {
    throw new Error('Unauthorized: Admin access required');
  }
  return true;
};

// Middleware for API routes
export const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await auth.verifyIdToken(token);
    const isAdminUser = await isAdmin(decodedToken);
    
    if (!isAdminUser) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token or unauthorized' });
  }
};

// Client-side admin check hook

export const useAdminCheck = () => {
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const adminStatus = await isAdmin(user);
          setIsAdminUser(adminStatus);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdminUser(false);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        checkAdminStatus();
      } else {
        setIsAdminUser(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { isAdminUser, loading };
};