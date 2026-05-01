"use client";

export default function OverviewTab({ order }) {
  const timeline = order.adminTimeline || [];

  return (
    <div className="space-y-6">

      {/* ================= TOP SECTION ================= */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* 🔥 TIMELINE */}
        <div className="border rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-5">
            Order Status Timeline
          </h3>

          <div className="space-y-6">
            {timeline.length > 0 ? (
              timeline.map((t, i) => (
                <div key={i} className="flex gap-4">

                  {/* DOT + LINE */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                        i === 0
                          ? "bg-gray-400"
                          : "bg-green-600"
                      }`}
                    >
                      ✓
                    </div>

                    {i !== timeline.length - 1 && (
                      <div className="w-[2px] h-10 bg-gray-300 mt-1" />
                    )}
                  </div>

                  {/* TEXT */}
                  <div>
                    <p className="font-medium capitalize text-gray-800">
                      {t.status.replaceAll("_", " ")}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(t.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No timeline</p>
            )}
          </div>
        </div>

        {/* 🔥 ORDER SUMMARY */}
        <div className="border rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-5">
            Order Summary
          </h3>

          <div className="grid grid-cols-2 gap-y-4 text-sm">

            <div>
              <p className="text-gray-400">Customer</p>
              <p className="font-medium">
                {order.userId?.name || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Date Placed</p>
              <p className="font-medium">
                {new Date(order.createdAt).toDateString()}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Email</p>
              <p className="font-medium break-all">
                {order.userId?.email || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Order Total</p>
              <p className="font-medium">
                ₹{order.totalPrice || 0}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Shipping Address</p>
              <p className="font-medium">
                {order.addressId?.fullAddress || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Family Tree</p>
              <p className="font-medium">
                {order.treeName || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Wall Art ID</p>
              <p className="font-medium">
                {order.wallArtId || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Partner</p>
              <p className="font-medium">
                {order.assignedLab?.labName || "Not Assigned"}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* 🔥 FAMILY TREE PREVIEW */}
        <div className="border rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">
            {order.treeName || "Family Tree"}
          </h3>

          <div className="bg-black h-56 rounded-lg flex items-center justify-center text-white text-sm">
            Family Tree Preview
          </div>
        </div>

        {/* 🔥 QUOTES */}
        <div className="border rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">
            Quotes
          </h3>

          <p className="text-sm text-gray-400">
            Name of Wall Art
          </p>
          <p className="font-semibold mb-4">
            {order.wallArtName || "Legacy Wall Art"}
          </p>

          <p className="text-sm text-gray-400 mb-1">
            Quotes on Wall Art
          </p>
          <p className="text-gray-700 text-sm leading-6">
            {order.quote ||
              "The greatest purpose of life is to live it for something that will last longer than you."}
          </p>
        </div>
      </div>

    </div>
  );
}