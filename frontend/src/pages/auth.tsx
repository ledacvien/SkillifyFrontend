// src/app/auth.tsx
import { useState, FormEvent } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUser } from '../app/page';

// Define form event handler types
const AuthPage: React.FC = () => {
  const { setUsername } = useUser();
  const [email, setEmail] = useState<string>('');
  const [username, setUsernameInput] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true); // Toggle between login and signup
  const router = useRouter();

  // Handle user registration
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);

      // Send username and email to the server
      // await axios.post('/api/register', {
      //   username,
      //   email,
      // });

      setUsername(username);

      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  // Handle user login
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Fetch email using username
      // const response = await axios.get(`/api/getEmail?username=${username}`);
      // const email = response.data.email;
      const email = username      
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-6 text-center text-gray-800">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={isLogin ? handleLogin : handleSignUp}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-bold mb-2 text-gray-800">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsernameInput(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold mb-2 text-gray-800">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded text-black"
              />
            </div>
          )}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-bold mb-2 text-gray-800">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 hover:underline"
            >
              {isLogin ? 'Create an account' : 'Already have an account? Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
