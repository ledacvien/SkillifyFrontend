// pages/activities.tsx
import { useEffect, useState } from "react";
import Link from "next/link";

// Simulated activity data (replace with your actual data fetching logic)
const dummyActivities = [
  {
    id: 1,
    title: "Help with JavaScript",
    description: "Looking for someone to help me with JavaScript concepts.",
    createdBy: "user_123",
    acceptedBy: null,
    status: "open",
  },
  {
    id: 2,
    title: "Skill Swap: Guitar Lessons",
    description: "Offering guitar lessons in exchange for cooking classes.",
    createdBy: "user_123",
    acceptedBy: null,
    status: "open",
  },
  {
    id: 3,
    title: "Help with Resume",
    description: "Need someone to review my resume and provide feedback.",
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
    <div
      className="container-fluid vh-100 d-flex flex-column"
      style={{ backgroundColor: "#ffffff" }}
    >
      <h2
        className="text-center mb-4 mt-4"
        style={{ fontSize: "2rem", fontWeight: "bold", color: "#343a40" }}
      >
        Your Activities
      </h2>
      <div className="row justify-content-center flex-grow-1">
        {activities.length === 0 ? (
          <div className="col text-center">
            <div className="alert alert-info" role="alert">
              No activities posted yet.
            </div>
          </div>
        ) : (
          activities.map((activity) => (
            <div className="col-md-3 mb-4" key={activity.id}>
              <div
                className="card border-0 shadow-sm"
                style={{ height: "30%" }}
              >
                {" "}
                {/* Set height to 30% */}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary font-weight-bold mb-2">
                    {activity.title}
                  </h5>
                  <p className="card-text" style={{ flexGrow: 1 }}>
                    {activity.description}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Status: {activity.status}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="text-center mt-4 mb-4">
        <Link href="/dashboard" className="btn btn-secondary">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Activities;
