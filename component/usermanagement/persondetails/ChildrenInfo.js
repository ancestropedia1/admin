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
        setChildren(res.data.children || []);
      } catch (error) {
        console.error("Failed to fetch children", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, [userId]);

  if (loading) return <p className="text-sm text-gray-500">Loading children...</p>;

  if (!children.length) return <p>No children data</p>;

  return (
    <div className="space-y-4 mt-4">
      {children.map((child, i) => (
        <div key={i} className="border p-4 rounded-lg">
          <Info label="First Name" value={child.firstName} />
          <Info label="Last Name" value={child.lastName} />
          <Info label="Gender" value={child.gender} />
        </div>
      ))}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <p className="text-sm text-gray-700">
      <b>{label}:</b> {value || "—"}
    </p>
  );
}