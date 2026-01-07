"use client";

/* 🔹 UI HELPERS (MUST BE ABOVE) */

const StatusBadge = ({ type }) => (
  <div className="flex justify-center">
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        type === "granted"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-600"
      }`}
    >
      {type === "granted" ? "Granted" : "Denied"}
    </span>
  </div>
);

const ToggleBadge = ({ active }) => (
  <div className="flex justify-center">
    <span
      className={`px-4 py-1 rounded-full text-xs font-semibold ${
        active
          ? "bg-green-200 text-green-800"
          : "bg-red-200 text-red-700"
      }`}
    >
      {active ? "On" : "Off"}
    </span>
  </div>
);

const AccessDropdown = () => (
  <div className="flex justify-center">
    <select className="border rounded px-2 py-1 text-xs">
      <option>Access</option>
      <option>Granted</option>
      <option>Denied</option>
    </select>
  </div>
);

/* 🔹 MAIN COMPONENT */

export default function PermissionsSection() {
  return (
    <div className="bg-[#FBF7EF] border rounded-xl p-6">
      <h2 className="font-semibold text-lg mb-1">Role & Permissions</h2>
      <p className="text-sm text-gray-600 mb-6">
        Content Manager – Full editorial control with limited administrative access
      </p>

      {/* TABLE HEADER */}
      <div className="grid grid-cols-5 text-sm font-semibold border-b pb-2 mb-4">
        <span>Module</span>
        <span className="text-center">View</span>
        <span className="text-center">Edit</span>
        <span className="text-center">Delete</span>
        <span className="text-center">Full Access</span>
      </div>

      {/* ROWS */}
      <div className="grid grid-cols-5 items-center border-b py-3 text-sm">
        <span>User Management</span>
        <StatusBadge type="granted" />
        <StatusBadge type="granted" />
        <StatusBadge type="granted" />
        <ToggleBadge active />
      </div>

      <div className="grid grid-cols-5 items-center border-b py-3 text-sm">
        <span>DNA Management</span>
        <StatusBadge type="granted" />
        <StatusBadge type="denied" />
        <StatusBadge type="denied" />
        <ToggleBadge />
      </div>

      <div className="grid grid-cols-5 items-center border-b py-3 text-sm">
        <span>Vault Management</span>
        <StatusBadge type="granted" />
        <StatusBadge type="granted" />
        <StatusBadge type="denied" />
        <ToggleBadge />
      </div>

      <div className="grid grid-cols-5 items-center py-3 text-sm">
        <span>Support</span>
        <AccessDropdown />
        <AccessDropdown />
        <AccessDropdown />
        <ToggleBadge />
      </div>
    </div>
  );
}
