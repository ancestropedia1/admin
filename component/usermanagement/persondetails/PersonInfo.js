"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";

export default function PersonInfo({ userId }) {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchPerson = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get(
          `/admin/person/${userId}`
        );

        console.log("PERSON API 👉", res.data); // ✅ DEBUG

        setPerson(res.data?.person || null);
      } catch (error) {
        console.error("❌ Failed to fetch person", error);
        setPerson(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [userId]);

  // ✅ LOADING
  if (loading) {
    return (
      <p className="text-sm text-gray-500">
        Loading person...
      </p>
    );
  }

  // ✅ EMPTY CHECK (FIXED)
  if (!person || Object.keys(person).length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No person data found
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">

      {/* LEFT */}
      <div className="space-y-2">
        <Info label="First Name" value={person.firstName} />
        <Info label="Last Name" value={person.lastName} />
        <Info label="Gender" value={person.gender} />
        <Info label="Birth Date" value={person.birthDate} />

        <Info
          label="Living Status"
          value={
            person.living === undefined
              ? "—"
              : person.living
              ? "Yes"
              : "No"
          }
        />

        <Info label="Marital Status" value={person.maritalStatus} />
      </div>

      {/* RIGHT */}
      <div className="space-y-2">
        <Info label="Birth City" value={person.birthCity} />
        <Info label="Birth State" value={person.birthState} />
        <Info label="Birth Country" value={person.birthCountry} />
        <Info label="Residence City" value={person.residenceCity} />
        <Info label="Occupation" value={person.occupation} />
        <Info label="Religion" value={person.religion} />
      </div>

    </div>
  );
}

/* INFO COMPONENT */
function Info({ label, value }) {
  return (
    <p className="text-sm text-gray-700">
      <b className="text-gray-900">{label}:</b>{" "}
      {value ?? "—"} {/* ✅ better fallback */}
    </p>
  );
}