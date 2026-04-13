"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";
import EditChildrenModal from "./editpersonmodal.js/EditChildrenModal";

export default function ChildrenInfo({ userId }) {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEdit, setShowEdit] = useState(false); // ✅ NEW
  const [selectedChild, setSelectedChild] = useState(null); // ✅ NEW

  useEffect(() => {
    if (!userId) return;

    const fetchChildren = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/person/${userId}/children`
        );

        console.log("CHILDREN API 👉", res.data);

        setChildren(res.data.children || []);
      } catch (error) {
        console.error("Failed to fetch children", error);
        setChildren([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, [userId]);

  // ✅ LOADING
  if (loading) {
    return (
      <p className="text-sm text-gray-500 mt-4">
        Loading children...
      </p>
    );
  }

  return (
    <>
      <div className="bg-[#F6F1E9] rounded-xl p-6 mt-6 shadow-sm">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-green-800">
            👶 Children Information
          </h2>
        </div>

        {/* NO DATA */}
        {!children || children.length === 0 ? (
          <p className="text-sm text-gray-500">
            No children data available
          </p>
        ) : (

          <div className="space-y-6">

            {children.map((child, i) => (
              <div
                key={child._id || i}
                className="bg-white rounded-lg p-5 shadow-sm border"
              >

                {/* TITLE + ACTIONS */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-green-700 font-semibold">
                    Child {i + 1}
                  </h3>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedChild(child);
                        setShowEdit(true);
                      }}
                      className="border px-3 py-1 rounded text-sm hover:bg-gray-100"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() =>
                        child._id &&
                        window.open(`/user-management/${child._id}`, "_blank")
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
                    <Field label="First Name" value={child.firstName} />
                    <Field label="Last Name" value={child.lastName} />
                    <Field label="Gender" value={child.gender} />
                  </div>

                  {/* RIGHT */}
                  <div className="space-y-4">
                    <Field label="Birth Date" value={child.birthDate} />
                    <Field label="Birth City" value={child.birthCity} />
                    <Field label="Occupation" value={child.occupation} />
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* ✅ EDIT MODAL */}
      {showEdit && selectedChild && (
        <EditChildrenModal
          child={selectedChild}
          userId={userId}
          onClose={() => setShowEdit(false)}
          onUpdate={(updatedChild) => {
            setChildren((prev) =>
              prev.map((c) =>
                c._id === updatedChild._id ? updatedChild : c
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