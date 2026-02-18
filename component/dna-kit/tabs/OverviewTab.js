"use client";

import { CheckCircle, XCircle } from "lucide-react";

const OverviewTab = ({ order }) => {
  const timeline = [
    {
      label: "Order Placed",
      date: order.createdAt,
      done: true,
    },
    {
      label: "Kit Shipped",
      date: order.createdAt,
      done: true,
    },
    {
      label: "Sample Received by Lab",
      date: order.createdAt,
      done: order.dnaStatus !== "new_order",
    },
    {
      label: "Report Ready",
      date: null,
      done: order.dnaStatus === "report_ready",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* ================= LEFT : TIMELINE ================= */}
      <div className="border rounded-xl p-6 bg-white">
        <h3 className="text-lg font-semibold mb-6">Order Status Timeline</h3>

        <div className="space-y-6">
          {timeline.map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              {/* ICON */}
              <div className="mt-1">
                {step.done ? (
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                    <CheckCircle size={16} />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white">
                    <XCircle size={16} />
                  </div>
                )}
              </div>

              {/* TEXT */}
              <div>
                <p className="font-semibold text-gray-800">{step.label}</p>
                {step.date && (
                  <p className="text-sm text-gray-500">
                    On {new Date(step.date).toDateString()}
                  </p>
                )}
                {!step.done && (
                  <p className="text-sm text-gray-400">Not Yet Completed</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= RIGHT : SUMMARY ================= */}
      <div className="border rounded-xl p-6 bg-white">
        <h3 className="text-lg font-semibold mb-6">Order Summary</h3>

        <div className="grid grid-cols-2 gap-y-5 text-sm">
          <p className="text-gray-500">Customer</p>
          <p className="font-medium">
            {order.personalDetails?.firstName}{" "}
            {order.personalDetails?.lastName}
          </p>

          <p className="text-gray-500">Email</p>
          <p>{order.personalDetails?.email || "—"}</p>

          <p className="text-gray-500">Order Total</p>
          <p className="font-medium">Rs. {order.totalAmount}</p>

          <p className="text-gray-500">Sample ID</p>
          <p>{order.sampleId || "—"}</p>

          <p className="text-gray-500">Date Placed</p>
          <p>{new Date(order.createdAt).toDateString()}</p>

          <p className="text-gray-500">Lab Assigned</p>
          <p className="text-green-700 font-medium">
            {order.labAssigned || "Not Assigned"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
