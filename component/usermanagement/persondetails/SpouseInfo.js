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

        console.log("SPOUSES API 👉", res.data); // ✅ DEBUG

        setSpouses(res.data.spouses || []);
      } catch (error) {
        console.error("Failed to fetch spouses", error);
        setSpouses([]); // ✅ SAFE FALLBACK
      } finally {
        setLoading(false);
      }
    };

    fetchSpouses();
  }, [userId]);

  // ✅ LOADING
  if (loading) {
    return (
      <p className="text-sm text-gray-500">
        Loading spouses...
      </p>
    );
  }

  // ✅ NO DATA
  if (!spouses || spouses.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No spouse data available
      </p>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {spouses.map((s, i) => (
        <div
          key={s._id || i}
          className="border p-4 rounded-lg shadow-sm bg-gray-50"
        >
          <h3 className="font-semibold text-green-700 mb-2">
            Spouse {i + 1}
          </h3>

          <Info label="First Name" value={s.spouse?.firstName} />
          <Info label="Last Name" value={s.spouse?.lastName} />
          <Info label="Gender" value={s.spouse?.gender} />
          <Info label="Status" value={s.status} />
          <Info label="From Date" value={s.fromDate} />
          <Info label="To Date" value={s.toDate} />
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