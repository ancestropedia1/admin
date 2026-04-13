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

        console.log("PARENTS API 👉", res.data); // ✅ DEBUG

        setParents(res.data.parents || {});
      } catch (error) {
        console.error("Failed to fetch parents", error);
        setParents({});
      } finally {
        setLoading(false);
      }
    };

    fetchParents();
  }, [userId]);

  // ✅ LOADING
  if (loading) {
    return (
      <p className="text-sm text-gray-500">Loading parents...</p>
    );
  }

  // ✅ NO DATA AT ALL
  if (!parents || (!parents.father && !parents.mother)) {
    return (
      <p className="text-sm text-gray-500">
        No parents data available
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">

      {/* FATHER */}
      <div className="space-y-2 border p-4 rounded-lg">
        <h2 className="font-semibold text-green-700">Father</h2>

        {parents.father ? (
          <>
            <Info label="First Name" value={parents.father.firstName} />
            <Info label="Last Name" value={parents.father.lastName} />
            <Info label="Gender" value={parents.father.gender} />
          </>
        ) : (
          <p className="text-gray-500 text-sm">No father linked</p>
        )}
      </div>

      {/* MOTHER */}
      <div className="space-y-2 border p-4 rounded-lg">
        <h2 className="font-semibold text-green-700">Mother</h2>

        {parents.mother ? (
          <>
            <Info label="First Name" value={parents.mother.firstName} />
            <Info label="Last Name" value={parents.mother.lastName} />
            <Info label="Gender" value={parents.mother.gender} />
          </>
        ) : (
          <p className="text-gray-500 text-sm">No mother linked</p>
        )}
      </div>

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