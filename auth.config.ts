import { cookies } from "next/headers";

export interface User {
  id: string;
  email: string;
  name: string;
}

// In-memory user store (for demonstration - in production use a database)
const validUsers: Record<string, { password: string }> = {
  nurse1: { password: "password123" },
  nurse2: { password: "password456" },
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
  const user = validUsers[email];
  if (user && user.password === password) {
    return {
      id: email,
      email: email,
      name: email,
    };
  }
  return null;
}
