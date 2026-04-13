"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";

export default function ChildrenInfo({ userId }) {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchChildren = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/person/${userId}/children`
        );

        console.log("CHILDREN API 👉", res.data); // ✅ DEBUG

        setChildren(res.data.children || []);
      } catch (error) {
        console.error("Failed to fetch children", error);
        setChildren([]); // ✅ SAFE FALLBACK
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, [userId]);

  // ✅ LOADING
  if (loading) {
    return (
      <p className="text-sm text-gray-500">
        Loading children...
      </p>
    );
  }

  // ✅ NO DATA
  if (!children || children.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No children data available
      </p>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {children.map((child, i) => (
        <div
          key={child._id || i}
          className="border p-4 rounded-lg shadow-sm"
        >
          <h3 className="font-semibold text-green-700 mb-2">
            Child {i + 1}
          </h3>

          <Info label="First Name" value={child.firstName} />
          <Info label="Last Name" value={child.lastName} />
          <Info label="Gender" value={child.gender} />
        </div>
      ))}
    </div>
  );
}

/* SMALL INFO COMPONENT */
function Info({ label, value }) {
  return (
    <p className="text-sm text-gray-700">
      <b>{label}:</b> {value || "—"}
    </p>
  );
}