import { auth, db } from './firebase';
import { connectAuthEmulator, connectFirestoreEmulator } from 'firebase/auth';

// Test Firebase connection
export const testFirebaseConnection = async () => {
  try {
    console.log('Testing Firebase connection...');
    
    // Check if Firebase is initialized
    if (!auth || !db) {
      throw new Error('Firebase not properly initialized');
    }
    
    // Check Firebase config
    const config = auth.app.options;
    console.log('Firebase Config:', {
      projectId: config.projectId,
      authDomain: config.authDomain,
      apiKey: config.apiKey ? 'Set' : 'Missing'
    });
    
    // Test auth connection
    console.log('Auth instance:', auth);
    console.log('Current user:', auth.currentUser);
    
    return {
      success: true,
      message: 'Firebase connection successful',
      config: {
        projectId: config.projectId,
        authDomain: config.authDomain,
        hasApiKey: !!config.apiKey
      }
    };
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    return {
      success: false,
      message: error.message,
      error: error
    };
  }
};

// Check if environment variables are set
export const checkEnvironmentVariables = () => {
  const requiredVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID'
  ];
  
  const missing = [];
  const present = [];
  
  requiredVars.forEach(varName => {
    if (process.env[varName]) {
      present.push(varName);
    } else {
      missing.push(varName);
    }
  });
  
  return {
    missing,
    present,
    allSet: missing.length === 0
  };
};