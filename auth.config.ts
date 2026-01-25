import { cookies } from "next/headers";

export interface User {
  id: string;
  email: string;
  name: string;
}

interface StoredUser {
  password: string;
  email: string;
  name: string;
}

// In-memory user store (for demonstration - in production use a database)
const validUsers: Record<string, StoredUser> = {
  nurse1: { password: "password123", email: "nurse1@example.com", name: "Nurse One" },
  nurse2: { password: "password456", email: "nurse2@example.com", name: "Nurse Two" },
};

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionData = cookieStore.get("user")?.value;

  if (!sessionData) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(sessionData));
  } catch {
    return null;
  }
}

export async function validateCredentials(email: string, password: string): Promise<User | null> {
  // Check by email first
  const userEntry = Object.entries(validUsers).find(([_, user]) => user.email === email);

  if (userEntry) {
    const [userId, userData] = userEntry;
    if (userData.password === password) {
      return {
        id: userId,
        email: userData.email,
        name: userData.name,
      };
    }
  }

  // Fallback to username (for backward compatibility)
  const user = validUsers[email];
  if (user && user.password === password) {
    return {
      id: email,
      email: user.email,
      name: user.name,
    };
  }

  return null;
}

export async function registerUser(email: string, password: string, name: string): Promise<User | null> {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return null;
  }

  // Check if email already exists
  const existingUser = Object.values(validUsers).find(user => user.email === email);
  if (existingUser) {
    return null;
  }

  // Generate unique user ID
  const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Create new user
  validUsers[userId] = {
    password,
    email,
    name,
  };

  return {
    id: userId,
    email,
    name,
  };
}
