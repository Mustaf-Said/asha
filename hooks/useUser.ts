'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/auth.config';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in by checking cookie
    const checkUser = async () => {
      try {
        const response = await fetch('/api/user');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const logout = async () => {
    try {
      await fetch('/api/auth/[...nextauth]', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'signout',
        }),
      });
      setUser(null);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return { user, isLoading, logout };
}
