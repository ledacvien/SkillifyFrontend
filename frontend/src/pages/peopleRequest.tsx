// pages/activities.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { fetchRequestsForMe } from "../api"; // Import your API function
import { User } from "../models/user";
import { Request } from "../models/request";
import Link from "next/link";

const Activities: React.FC = () => {
  const [activities, setActivities] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userActivities = await fetchRequestsForMe(username as string); // Fetch activities for the logged-in user
          setActivities(userActivities);
        } catch (error) {
          console.error("Error fetching activities:", error);
        } finally {
          setLoading(false);
        }
      } else {
        router.push("/auth"); // Redirect to login page if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router, username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="activities-page">
      <h1>Activities</h1>
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>
              <h2>{activity.title}</h2>
              <p>{activity.description}</p>
              <p>Status: {activity.status}</p>
              {/* <Link href={`/peopleRequest/${activity.id}`}>
                <a>View Details</a>
              </Link> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Activities;