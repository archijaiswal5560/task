'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, hydrated } = useAuthStore();

  useEffect(() => {
    if (!hydrated) return; // ⛔ WAIT
    if (!isAuthenticated) router.replace('/login');
  }, [hydrated, isAuthenticated]);

  if (!hydrated) return null; // or loader

  return <>{children}</>;
}
