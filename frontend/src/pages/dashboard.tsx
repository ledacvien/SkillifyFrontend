// src/app/dashboard.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { FileInput } from "../components/Input";
import { Button1 } from "../components/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/RequestCard";
import Link from "next/link";
import {
  Search,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
} from "lucide-react";

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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">MyDashboard</h1>
        </div>
        <nav className="mt-6">
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          >
            <LayoutDashboard className="inline-block w-5 h-5 mr-2" />
            Dashboard
          </Link>
          <Link
            href="/users"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          >
            <Users className="inline-block w-5 h-5 mr-2" />
            Users
          </Link>
          <Link
            href="/reports"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          >
            <FileText className="inline-block w-5 h-5 mr-2" />
            Reports
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          >
            <Settings className="inline-block w-5 h-5 mr-2" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="relative">
              <FileInput
                type="text"
                placeholder="Search skills..."
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Dashboard Cards */}
            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1,234</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">42</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Completed Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">789</p>
              </CardContent>
            </Card>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </main>
    </div>
  );
};

export default Dashboard;
