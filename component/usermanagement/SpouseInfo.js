"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";

export default function SpouseInfo({ userId }) {
  const [spouses, setSpouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchSpouses = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/person/${userId}/spouses`
        );
        setSpouses(res.data.spouses || []);
      } catch (error) {
        console.error("Failed to fetch spouses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpouses();
  }, [userId]);

  if (loading) return <p className="text-sm text-gray-500">Loading spouses...</p>;

  if (!spouses.length) return <p>No spouse data</p>;

  return (
    <div className="space-y-4 mt-4">
      {spouses.map((s, i) => (
        <div key={i} className="border p-4 rounded-lg">
          <Info label="First Name" value={s.spouse?.firstName} />
          <Info label="Last Name" value={s.spouse?.lastName} />
          <Info label="Status" value={s.status} />
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