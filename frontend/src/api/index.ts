// src/api/index.ts
import { User } from "../models/user";
import axios from "axios";

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
