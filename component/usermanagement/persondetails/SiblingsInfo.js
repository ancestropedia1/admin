"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { axiosInstance } from "@/config/axios";

export default function SiblingsInfo({ userId }) {
  const [siblings, setSiblings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiblings = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/users/users/${userId}`
        );

        setSiblings(res.data.user?.siblings || []);
      } catch (error) {
        console.error("Failed to load siblings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSiblings();
  }, [userId]);

  if (loading) return <div className="mt-6">Loading...</div>;

  return (
    <div className="bg-[#F6F1E9] rounded-xl p-6 mt-6 shadow-sm">
      <h2 className="text-lg font-semibold text-green-800 flex items-center gap-2 mb-6">
        <Users size={18} /> Siblings Information
      </h2>

      {siblings.length === 0 ? (
        <p className="text-sm text-gray-500">No siblings found</p>
      ) : (
        <div className="space-y-4">
          {siblings.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 border grid md:grid-cols-3 gap-4"
            >
              <Field label="Name" value={item.name} />
              <Field label="Relation" value={item.relation} />
              <Field label="Gender" value={item.gender} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-sm">{value || "—"}</p>
    </div>
  );
}