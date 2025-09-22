import { useState, useEffect } from 'react';
import { testFirebaseConnection, checkEnvironmentVariables } from '../utils/firebaseTest';

export default function Debug() {
  const [firebaseTest, setFirebaseTest] = useState(null);
  const [envVars, setEnvVars] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runTests = async () => {
      try {
        const fbTest = await testFirebaseConnection();
        const envTest = checkEnvironmentVariables();
        
        setFirebaseTest(fbTest);
        setEnvVars(envTest);
      } catch (error) {
        console.error('Debug test error:', error);
      } finally {
        setLoading(false);
      }
    };

    runTests();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Running Firebase diagnostics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Firebase Debug Information</h1>
        
        {/* Environment Variables */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Environment Variables</h2>
          {envVars && (
            <div>
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  envVars.allSet ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {envVars.allSet ? 'All Required Variables Set' : 'Missing Variables'}
                </span>
              </div>
              
              {envVars.present.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium text-green-700 mb-2">Present Variables:</h3>
                  <ul className="list-disc list-inside text-sm text-green-600">
                    {envVars.present.map(varName => (
                      <li key={varName}>{varName}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {envVars.missing.length > 0 && (
                <div>
                  <h3 className="font-medium text-red-700 mb-2">Missing Variables:</h3>
                  <ul className="list-disc list-inside text-sm text-red-600">
                    {envVars.missing.map(varName => (
                      <li key={varName}>{varName}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Firebase Connection Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Firebase Connection Test</h2>
          {firebaseTest && (
            <div>
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  firebaseTest.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {firebaseTest.success ? 'Connection Successful' : 'Connection Failed'}
                </span>
              </div>
              
              <p className="text-gray-700 mb-4">{firebaseTest.message}</p>
              
              {firebaseTest.config && (
                <div className="bg-gray-50 rounded p-4">
                  <h3 className="font-medium text-gray-800 mb-2">Firebase Configuration:</h3>
                  <ul className="text-sm text-gray-600">
                    <li><strong>Project ID:</strong> {firebaseTest.config.projectId}</li>
                    <li><strong>Auth Domain:</strong> {firebaseTest.config.authDomain}</li>
                    <li><strong>API Key:</strong> {firebaseTest.config.hasApiKey ? 'Present' : 'Missing'}</li>
                  </ul>
                </div>
              )}
              
              {firebaseTest.error && (
                <div className="bg-red-50 rounded p-4 mt-4">
                  <h3 className="font-medium text-red-800 mb-2">Error Details:</h3>
                  <pre className="text-sm text-red-600 whitespace-pre-wrap">
                    {JSON.stringify(firebaseTest.error, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Setup Instructions</h2>
          <div className="text-blue-700">
            <p className="mb-4">If you're seeing errors, follow these steps:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Go to <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="underline">Firebase Console</a></li>
              <li>Create a new project or select existing project</li>
              <li>Enable Authentication → Sign-in method → Email/Password</li>
              <li>Enable Firestore Database</li>
              <li>Get your config from Project Settings → General → Your apps</li>
              <li>Add all environment variables to Vercel</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}