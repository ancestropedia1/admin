"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";
import EditParentsModal from "./editpersonmodal.js/EditParentsModal"; // ✅ ADD THIS

export default function ParentsInfo({ userId }) {
  const [parents, setParents] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showEdit, setShowEdit] = useState(false); // ✅ NEW

  useEffect(() => {
    if (!userId) return;

    const fetchParents = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/person/${userId}/parents`
        );

        console.log("PARENTS API 👉", res.data);

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

  if (loading) {
    return <p className="text-sm text-gray-500 mt-4">Loading parents...</p>;
  }

  return (
    <>
      <div className="space-y-6 mt-6">

        {/* ✅ FATHER CARD */}
        <div className="bg-[#F6F1E9] rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-green-800 font-semibold flex items-center gap-2">
              👨 Father’s Information
            </h2>

            <div className="flex gap-2">
              <button
                onClick={() => setShowEdit(true)}
                className="border px-3 py-1 rounded text-sm hover:bg-gray-100"
              >
                ✏️ Edit
              </button>

              <button
                onClick={() =>
                  parents?.father?._id &&
                  window.open(`/user-management/${parents.father._id}`, "_blank")
                }
                className="border px-3 py-1 rounded text-sm hover:bg-gray-100"
              >
                View Profile
              </button>
            </div>
          </div>

          {parents?.father ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm">

              <Field
                label="Father’s Name"
                value={`${parents.father.firstName || ""} ${parents.father.lastName || ""}`}
              />

              <Field
                label="Birth Date"
                value={parents.father.birthDate}
              />

              <Field
                label="Gender"
                value={parents.father.gender}
              />

              <Field
                label="Occupation"
                value={parents.father.occupation}
              />

            </div>
          ) : (
            <p className="text-gray-500 text-sm">No father linked</p>
          )}
        </div>

        {/* ✅ MOTHER CARD */}
        <div className="bg-[#F6F1E9] rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-green-800 font-semibold flex items-center gap-2">
              👩 Mother’s Information
            </h2>

            <div className="flex gap-2">
              <button
                onClick={() => setShowEdit(true)}
                className="border px-3 py-1 rounded text-sm hover:bg-gray-100"
              >
                ✏️ Edit
              </button>

              <button
                onClick={() =>
                  parents?.mother?._id &&
                  window.open(`/user-management/${parents.mother._id}`, "_blank")
                }
                className="border px-3 py-1 rounded text-sm hover:bg-gray-100"
              >
                View Profile
              </button>
            </div>
          </div>

          {parents?.mother ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm">

              <Field
                label="Mother’s Name"
                value={`${parents.mother.firstName || ""} ${parents.mother.lastName || ""}`}
              />

              <Field
                label="Birth Date"
                value={parents.mother.birthDate}
              />

              <Field
                label="Gender"
                value={parents.mother.gender}
              />

              <Field
                label="Occupation"
                value={parents.mother.occupation}
              />

            </div>
          ) : (
            <p className="text-gray-500 text-sm">No mother linked</p>
          )}
        </div>

      </div>

      {/* ✅ EDIT MODAL */}
      {showEdit && (
        <EditParentsModal
          parents={parents}
          userId={userId}
          onClose={() => setShowEdit(false)}
          onUpdate={(updatedPerson) => {
            // 🔥 REFRESH UI AFTER UPDATE
            setParents({
              father: updatedPerson.father,
              mother: updatedPerson.mother,
            });
          }}
        />
      )}
    </>
  );
}

/* ✅ FIELD COMPONENT */
function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-900">
        {value || "—"}
      </p>
    </div>
  );
}