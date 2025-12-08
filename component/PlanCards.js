// components/PlanCard.jsx
"use client";

export default function PlanCard({ title, tokens, color }) {
  return (
    <div className={`${color} p-6 rounded-xl shadow`}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      <p className="text-green-700 font-bold text-xl">{tokens}</p>
      <p className="text-sm text-gray-600 mb-4">Current allocation per user</p>

      <button className="bg-green-800 text-white w-full sm:w-auto sm:py-1 px-12 py-4 text-sm sm:text-base rounded-md">
        Modify Allocation
      </button>
    </div>
  );
}
