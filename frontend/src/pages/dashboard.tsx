// src/app/dashboard.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Dashboard: React.FC = () => {
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/auth');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push('/auth');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl">Welcome to the Dashboard</h1>
      <button
        onClick={handleLogout}
        className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
