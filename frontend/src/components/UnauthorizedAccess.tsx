'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function UnauthorizedAccess() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
      <p className="text-gray-700 mb-6 text-center">
        You do not have permission to view this page. Please log in with an appropriate account.
      </p>
      <button
        onClick={() => router.push('/login')}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Go to Login
      </button>
    </div>
  );
}
