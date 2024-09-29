// src/api/index.ts
import { User } from '../models/user';
import { Request } from '../models/request';
import axios from 'axios';

// Function to fetch the list of skills
export const fetchSkills = async () => {
  try {
    // const response = await axios.get('http://example.com/skills');
    // return response.data; // Return the list of skills
    const skills = [
      "Plumbing",
      "Electrical",
      "Gardening",
      "Grocery Shopping",
      "Babysitting",
    ];
    return skills;
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
};

// Function to fetch the list of users based on skill
export const fetchUsersBySkill = async (skill: string) => {
  try {
    // const response = await axios.get(`http://example.com/users?skill=${skill}`);
    // return response.data; // Return the list of users

    const sampleUsers: User[] = [
      { username: "karankamboj", name: "Karan Kamboj", skills: ["Plumbing"] },
      { username: "sumedha", name: "Sumedha Gupta", skills: ["Gardening"] },
      // Add more sample users
    ];
    return sampleUsers;
  } catch (error) {
    console.error("Error fetching users by skill:", error);
    throw error;
  }
};

// Function to submit a request
export const submitRequest = async (requestData: {
  requesterUsername: string;
  targetUsername: string;
  title: string;
  description: string;
}) => {
  try {
    const response = await fetch("/api/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit request");
    }

    return response.json();
  } catch (error) {
    console.error("Error submitting request:", error);
    throw error;
  }
};

export const fetchUser = async (username: string) => {
  try {
    const response = await axios.get(`/api/getUser?username=${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const createUser = async (user: User) => {
  try {
    const response = await axios.post('/api/createUser', user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export const updateUser = async (user: User) => {
  try {
    const response = await axios.put('/api/updateUser', user);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

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

// Function to fetch all requests that a user made
export const fetchMyRequests = async (username: string) => {
  try {
    const response = await axios.get(`/api/getMyRequests?username=${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching requests:', error);
    throw error;
  }
}

export const fetchRequestsForMe = async (username: string) => {
  try {
    // const response = await axios.get(`/api/getRequestsForMe?username=${username}`);
    // return response.data;
    return dummyActivities;
  } catch (error) {
    console.error('Error fetching requests:', error);
    throw error;
  }
}
