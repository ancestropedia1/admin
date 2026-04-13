"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";
import EditSpouseModal from "./editpersonmodal.js/EditSpouseModal";

export default function SpouseInfo({ userId }) {
  const [spouses, setSpouses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEdit, setShowEdit] = useState(false); // ✅ NEW
  const [selectedSpouse, setSelectedSpouse] = useState(null); // ✅ NEW

  useEffect(() => {
    if (!userId) return;

    const fetchSpouses = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/person/${userId}/spouses`
        );

        console.log("SPOUSES API 👉", res.data);

        setSpouses(res.data.spouses || []);
      } catch (error) {
        console.error("Failed to fetch spouses", error);
        setSpouses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSpouses();
  }, [userId]);

  // ✅ LOADING
  if (loading) {
    return (
      <p className="text-sm text-gray-500 mt-4">
        Loading spouses...
      </p>
    );
  }

  return (
    <>
      <div className="bg-[#F6F1E9] rounded-xl p-6 mt-6 shadow-sm">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-green-800">
            💍 Spouse Information
          </h2>
        </div>

        {/* NO DATA */}
        {!spouses || spouses.length === 0 ? (
          <p className="text-sm text-gray-500">
            No spouse data available
          </p>
        ) : (

          <div className="space-y-6">

            {spouses.map((s, i) => (
              <div
                key={s._id || i}
                className="bg-white rounded-lg p-5 shadow-sm border"
              >

                {/* TITLE + ACTIONS */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-green-700 font-semibold">
                    Spouse {i + 1}
                  </h3>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedSpouse(s);
                        setShowEdit(true);
                      }}
                      className="border px-3 py-1 rounded text-sm hover:bg-gray-100"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() =>
                        s.spouse?._id &&
                        window.open(`/user-management/${s.spouse._id}`, "_blank")
                      }
                      className="border px-3 py-1 rounded text-sm hover:bg-gray-100"
                    >
                      View Profile
                    </button>
                  </div>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">

                  {/* LEFT */}
                  <div className="space-y-4">
                    <Field label="First Name" value={s.spouse?.firstName} />
                    <Field label="Last Name" value={s.spouse?.lastName} />
                    <Field label="Gender" value={s.spouse?.gender} />
                  </div>

                  {/* RIGHT */}
                  <div className="space-y-4">
                    <Field label="Status" value={s.status} />
                    <Field label="From Date" value={s.fromDate} />
                    <Field label="To Date" value={s.toDate} />
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* ✅ EDIT MODAL */}
      {showEdit && selectedSpouse && (
        <EditSpouseModal
          spouseData={selectedSpouse}
          userId={userId}
          onClose={() => setShowEdit(false)}
          onUpdate={(updatedSpouse) => {
            // 🔥 UPDATE UI WITHOUT RELOAD
            setSpouses((prev) =>
              prev.map((s) =>
                s._id === updatedSpouse._id ? updatedSpouse : s
              )
            );
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