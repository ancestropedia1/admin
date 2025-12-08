"use client";

export default function Card({ icon, value, label }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-gray-600 text-sm">{label}</div>
      </div>
    </div>
  );
}
