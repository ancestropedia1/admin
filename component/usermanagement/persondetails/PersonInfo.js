"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";
import EditPersonModal from "./editpersonmodal.js/EditPersonModal";
export default function PersonInfo({ userId }) {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    if (!userId) {
      console.warn("PersonInfo: userId is undefined or null");
      setLoading(false);
      return;
    }

    const fetchPerson = async () => {
      try {
        setLoading(true);
        console.log("Fetching person for userId:", userId);

        const res = await axiosInstance.get(`/admin/person/${userId}`);

        console.log("Person API response:", res.data);
        setPerson(res.data?.person || null);
      } catch (error) {
        console.error("Failed to fetch person:", error);
        setPerson(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [userId]);

  if (loading) {
    return <p className="text-sm text-gray-500 mt-4">Loading person...</p>;
  }

  if (!person) {
    return <p className="text-sm text-gray-500 mt-4">No person data found</p>;
  }

  return (
    <>
      <div className="bg-[#F6F1E9] rounded-xl p-4 md:p-6 mt-6 shadow-sm">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h2 className="text-base md:text-lg font-semibold text-green-800">
            👤 Person Information
          </h2>
          <button
            onClick={() => setShowEdit(true)}
            className="border px-4 py-2 rounded-md text-sm hover:bg-gray-100 w-full sm:w-auto"
          >
            ✏️ Edit
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 text-sm">

          {/* LEFT */}
          <div className="space-y-4">
            <Field label="First Name" value={person.firstName} />
            <Field label="Last Name" value={person.lastName} />
            <Field label="Gender" value={person.gender} />
            <Field
              label="Birth Date"
              value={
                person.birthDate
                  ? new Date(person.birthDate).toLocaleDateString()
                  : null
              }
            />
            <Field
              label="Living Status"
              value={
                person.living === undefined || person.living === null
                  ? null
                  : person.living
                  ? "Yes"
                  : "No"
              }
            />
            <Field label="Marital Status" value={person.maritalStatus} />
            <Field label="Children Count" value={person.childrenCount} />
            <Field label="Spouse Count" value={person.spouseCount} />
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            <Field label="Birth City" value={person.birthCity} />
            <Field label="Birth State" value={person.birthState} />
            <Field label="Birth Country" value={person.birthCountry} />
            <Field label="Residence City" value={person.residenceCity} />
            <Field label="Residence State" value={person.residenceState} />
            <Field label="Residence Country" value={person.residenceCountry} />
            <Field label="Occupation" value={person.occupation} />
            <Field label="Religion" value={person.religion} />
            <Field label="Community" value={person.community} />
          </div>

        </div>
      </div>

      {/* MODAL */}
      {showEdit && (
        <EditPersonModal
          person={person}
          userId={userId}
          onClose={() => setShowEdit(false)}
          onUpdate={(updatedPerson) => {
            setPerson(updatedPerson);
            setShowEdit(false);
          }}
        />
      )}
    </>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-900 break-words">
        {value !== undefined && value !== null && value !== "" ? value : "—"}
      </p>
    </div>
  );
}