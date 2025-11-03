import { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

// Allowed email addresses - add your email and paralegal's email here
const ALLOWED_EMAILS = [
  'rozsagyenelaw1@gmail.com',
  // Add your paralegal's email here
  // 'paralegal@example.com',
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Set persistence to local (survives browser refresh)
    setPersistence(auth, browserLocalPersistence).catch(console.error);

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && ALLOWED_EMAILS.includes(user.email)) {
        setUser(user);
      } else if (user) {
        // User is signed in but not allowed
        signOut(auth);
        setUser(null);
        setError('Your email is not authorized to access this application.');
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      setError('');

      // Check if email is allowed
      if (!ALLOWED_EMAILS.includes(email)) {
        throw new Error('Your email is not authorized to access this application.');
      }

      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (err) {
      console.error('Login error:', err);

      // User-friendly error messages
      let errorMessage = 'Failed to log in. Please check your credentials.';

      if (err.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      } else if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setError('');
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to log out');
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
