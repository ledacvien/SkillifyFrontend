import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "../app/globals.css";
import Link from "next/link";
import { FileInput } from "../components/Input";
import { LayoutDashboard, Users, Search } from "lucide-react";

const Dashboard: React.FC = () => {
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/auth");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg rounded-r-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">MyDashboard</h1>
        </div>
        <nav className="mt-6">
          <Link
            href="/dashboard"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
          >
            <LayoutDashboard className="inline-block w-5 h-5 mr-2" />
            Dashboard
          </Link>
          <Link
            href="/profile"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
          >
            <Users className="inline-block w-5 h-5 mr-2" />
            Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <header className="bg-white shadow-sm rounded-lg mb-4 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="relative">
              <FileInput
                type="text"
                placeholder="Search skills..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto py-6">
          {/* Content grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Example Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
              <h2 className="text-xl font-semibold">Skill Category</h2>
              <p className="text-gray-600">
                Description of the skill category.
              </p>
            </div>
            {/* Repeat similar cards as needed */}
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-end pr-6 pb-6">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md transition-all duration-200 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
