// pages/activities.tsx
import { useEffect, useState } from "react";
import Link from "next/link";

// Simulated activity data (replace with your actual data fetching logic)
const dummyActivities = [
  {
    id: 1,
    title: "Help with JavaScript",
    description: "Looking for someone to help me with JavaScript concepts.",
    requestType: "micro-assistance",
    createdBy: "user_123",
    acceptedBy: null,
    status: "open",
  },
  {
    id: 2,
    title: "Skill Swap: Guitar Lessons",
    description: "Offering guitar lessons in exchange for cooking classes.",
    requestType: "skill-swap",
    createdBy: "user_123",
    acceptedBy: null,
    status: "open",
  },
  {
    id: 3,
    title: "Help with Resume",
    description: "Need someone to review my resume and provide feedback.",
    requestType: "micro-assistance",
    createdBy: "user_123",
    acceptedBy: null,
    status: "completed",
  },
];

const Activities: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching activities for the logged-in user
    const userId = "user_123"; // Replace with the actual logged-in user ID
    const userActivities = dummyActivities.filter(
      (activity) => activity.createdBy === userId
    );
    setActivities(userActivities);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Activities</h2>
      <div className="list-group">
        {activities.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            No activities posted yet.
          </div>
        ) : (
          activities.map((activity) => (
            <Link href={`/activities/${activity.id}`} key={activity.id}>
              <div className="list-group-item list-group-item-action">
                <h5 className="mb-1">{activity.title}</h5>
                <p className="mb-1">{activity.description}</p>
                <small>Status: {activity.status}</small>
                <br />
                <small>Request Type: {activity.requestType}</small>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Activities;
