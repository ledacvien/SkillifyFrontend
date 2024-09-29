import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import UserProfile from "../components/UserProfile"; // Assuming UserProfile is in components

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // Simulating fetching user data from a database
        setUser({
          id: authUser.uid,
          name: authUser.displayName || "John Doe",
          email: authUser.email || "example@example.com",
          bio: "This is a short bio about the user.",
          skills: ["JavaScript", "React", "Node.js"], // Example skills
          profilePicture: "https://via.placeholder.com/150", // Placeholder image
        });
      } else {
        router.push("/auth");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSendRequest = () => {
    console.log("Friend request sent!");
    alert("Friend request sent!");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data available.</div>;
  }

  return (
    <div className="h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <UserProfile user={user} onSendRequest={handleSendRequest} />
      </div>
    </div>
  );
};

export default ProfilePage;
