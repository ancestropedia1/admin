"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";

export default function VaultPlanAllocation() {
  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(true);

  // MODAL
  const [open, setOpen] = useState(false);

  const [selectedPlan, setSelectedPlan] =
    useState({
      planType: "",
      tier: "",
      storageGB: "",
    });

  // FETCH PLANS
  const fetchPlans = async () => {
    try {
      const res = await axiosInstance.get(
        "/admin/vault/plans/modify"
      );

      if (res.data.success) {
        setPlans(res.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // OPEN MODAL
  const openModal = (
    planType,
    tier,
    storageGB
  ) => {
    setSelectedPlan({
      planType,
      tier,
      storageGB,
    });

    setOpen(true);
  };

  // SAVE
  const saveAllocation = async () => {
    try {
      await axiosInstance.put(
        "/admin/vault/plans/modify",
        selectedPlan
      );

      fetchPlans();
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const renderPlans = (
    title,
    type,
    data
  ) => {
    const cards = [
      {
        title: "Standard Plan",
        tier: "standard",
        storage:
          data?.standard?.storageGB || 5,
        bg: "bg-[#F5F1ED]",
      },
      {
        title: "Pro Plan",
        tier: "pro",
        storage:
          data?.pro?.storageGB || 10,
        bg: "bg-[#FFF0CC]",
      },
      {
        title: "Free Plan",
        tier: "free",
        storage:
          data?.free?.storageGB || 1,
        bg: "bg-[#DDEBFF]",
      },
    ];

    return (
      <div className="bg-[#EDF8F1] rounded-2xl border p-6">
        <h2 className="text-3xl font-bold mb-6">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((plan) => (
            <div
              key={plan.title}
              className={`${plan.bg} rounded-2xl p-5 border`}
            >
              <h3 className="font-semibold text-lg">
                {plan.title}
              </h3>

              <p className="text-3xl font-bold text-[#FF6B35] mt-4">
                {plan.storage} GB
              </p>

              <p className="text-xs text-gray-500 mt-2">
                Current allocation per user
              </p>

              <button
                onClick={() =>
                  openModal(
                    type,
                    plan.tier,
                    plan.storage
                  )
                }
                className="mt-5 w-full bg-[#1B4332] text-white py-3 rounded-xl"
              >
                Modify Allocation
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return <p>Loading plans...</p>;
  }

  return (
    <div className="space-y-6">

      {renderPlans(
        "Public Plan Allocation",
        "public",
        plans?.public
      )}

      {renderPlans(
        "Private Storage Plan Allocation",
        "private",
        plans?.private
      )}

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl w-full max-w-md p-6">

            <h2 className="text-2xl font-bold mb-4">
              Modify Allocation
            </h2>

            <div>
              <label className="text-sm font-medium">
                Storage (GB)
              </label>

              <input
                type="number"
                value={
                  selectedPlan.storageGB
                }
                onChange={(e) =>
                  setSelectedPlan({
                    ...selectedPlan,
                    storageGB:
                      e.target.value,
                  })
                }
                className="w-full mt-2 border rounded-xl px-4 py-3 outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() =>
                  setOpen(false)
                }
                className="px-5 py-2 border rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={saveAllocation}
                className="px-5 py-2 bg-[#1B4332] text-white rounded-xl"
              >
                Save
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}