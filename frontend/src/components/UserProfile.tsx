import React from "react";

// Define the UserProfileProps interface for TypeScript typing
interface UserProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    bio: string;
    skills: string[];
    profilePicture: string;
  };
  onSendRequest: () => void; // Function type for the friend request
}

// UserProfile component
const UserProfile: React.FC<UserProfileProps> = ({ user, onSendRequest }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
      <div className="flex items-center space-x-6">
        {/* Profile Picture */}
        <img
          src={user.profilePicture}
          alt="Profile Picture"
          className="w-32 h-32 rounded-full"
        />
        {/* User Information */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="mt-2 text-gray-600">{user.bio}</p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Skills</h3>
        <ul className="list-disc list-inside mt-2 text-gray-600">
          {user.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* Friend Request Button */}
      <button
        onClick={onSendRequest}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Send Friend Request
      </button>
    </div>
  );
};

export default UserProfile;
