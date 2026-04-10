"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";

export default function ParentsInfo({ userId }) {
  const [parents, setParents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchParents = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/person/${userId}/parents`
        );
        setParents(res.data.parents);
      } catch (error) {
        console.error("Failed to fetch parents", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParents();
  }, [userId]);

  if (loading) return <p className="text-sm text-gray-500">Loading parents...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">

      {/* FATHER */}
      <div className="space-y-2">
        <h2 className="font-semibold text-green-700">Father</h2>
        <Info label="First Name" value={parents?.father?.firstName} />
        <Info label="Last Name" value={parents?.father?.lastName} />
        <Info label="Gender" value={parents?.father?.gender} />
      </div>

      {/* MOTHER */}
      <div className="space-y-2">
        <h2 className="font-semibold text-green-700">Mother</h2>
        <Info label="First Name" value={parents?.mother?.firstName} />
        <Info label="Last Name" value={parents?.mother?.lastName} />
        <Info label="Gender" value={parents?.mother?.gender} />
      </div>

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