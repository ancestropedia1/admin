"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6 text-gray-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={() => router.push("/dashboard")}
        className="text-white cursor-pointer bg-[#265A46] hover:bg-[#1E3A32] active:bg-[#1E3A32] px-6 py-2 rounded transition-all duration-300"
      >
        Go Home
      </button>
    </div>
  );
}
