// components/NotificationBell.jsx
"use client";

import { Bell, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close popup on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      {/* 🔔 Bell Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative focus:outline-none"
      >
        <Bell className="text-gray-600" size={20} />

        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
          3
        </span>
      </button>

      {/* 🔔 Notification Popup */}
      {open && (
        <div className="fixed top-[72px] w-[600px] bg-white border rounded-xl shadow-2xl z-[999]">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-sm font-semibold">Notifications</h3>
            <button onClick={() => setOpen(false)}>
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="h-[280px] w-full overflow-y-auto">
            <NotificationItem
              tag="DNA"
              name="Anant Narayan"
              message="Marked 3 DNA kits as pending shipment. Shipment delay due to verification issue."
              color="purple"
            />

            <NotificationItem
              tag="Family Tree Upload Completed"
              name="Divyanshu Bansal (Admin)"
              message="Uploaded new family records for Verma Family Lineage."
              color="green"
            />

            <NotificationItem
              tag="Vault Storage Alert"
              name="System Notification"
              message="User vault exceeded 90% storage capacity."
              color="orange"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationItem({ tag, name, message, color }) {
  const colorMap = {
    purple: "bg-purple-50 text-purple-700",
    green: "bg-green-50 text-green-700",
    orange: "bg-orange-50 text-orange-700",
  };

  return (
    <div className="px-4 py-3 border-b last:border-none">
      <span
        className={`inline-block text-xs px-2 py-0.5 rounded-full mb-2 ${colorMap[color]}`}
      >
        {tag}
      </span>

      <h4 className="text-sm font-medium">{name}</h4>

      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
        {message}
      </p>

      <p className="text-[10px] text-gray-400 mt-2">
        12 min ago
      </p>
    </div>
  );
}
