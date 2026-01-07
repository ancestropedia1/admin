"use client";

export default function StatsCards({ executive = {} }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Total Users</p>
        <p className="text-2xl font-bold">{executive.totalUsers}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Active Users</p>
        <p className="text-2xl font-bold">{executive.activeUsers}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Tasks Completed</p>
        <p className="text-2xl font-bold">{executive.tasks}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Performance</p>
        <p className="text-2xl font-bold">{executive.performance}</p>
      </div>
    </div>
  );
}
