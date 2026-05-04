"use client";

// ✅ FIX: OverviewTab now receives the full `order` object as a prop
// from OrderDetailsModal — no more duplicate fetching or orderId mismatch.

export default function OverviewTab({ order }) {
  if (!order) {
    return <p className="text-red-500">Order not found</p>;
  }

  // ✅ FIX: Timeline sorted latest-first on backend already.
  // Index 0 = most recent = GREEN (active)
  // Last index = oldest = GRAY (past)
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

                  <div className="flex flex-col items-center">
                    {/* ✅ FIX: i === 0 is LATEST → GREEN */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                        i === 0 ? "bg-green-600" : "bg-gray-300"
                      }`}
                    >
                      ✓
                    </div>

                    {i !== timeline.length - 1 && (
                      <div className="w-[2px] h-10 bg-gray-300 mt-1" />
                    )}
                  </div>

                  <div>
                    <p className={`font-medium capitalize ${
                      i === 0 ? "text-gray-900" : "text-gray-400"
                    }`}>
                      {t.status.replaceAll("_", " ")}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(t.updatedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    {t.note && (
                      <p className="text-xs text-gray-500 mt-1 italic">
                        {t.note}
                      </p>
                    )}
                  </div>

                </div>
              ))
            ) : (
              <p className="text-gray-400">No timeline entries yet</p>
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
              <p className="font-medium">{order.userId?.name || "-"}</p>
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
              <p className="font-medium">₹{order.totalPrice || 0}</p>
            </div>

            <div>
              <p className="text-gray-400">Shipping Address</p>
              <p className="font-medium">
                {/* ✅ address is populated from addressId via .populate("addressId") */}
                {order.address?.fullAddress || order.address?.city || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Family Tree</p>
              <p className="font-medium">{order.treeName || "-"}</p>
            </div>

            <div>
              <p className="text-gray-400">Wall Art ID</p>
              <p className="font-medium">{order.orderId || "-"}</p>
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

        <div className="border rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">
            {order.treeName || "Family Tree"}
          </h3>

          {order.previewImage ? (
            <img
              src={order.previewImage}
              alt="Family Tree Preview"
              className="w-full h-56 object-contain rounded-lg border"
            />
          ) : (
            <div className="bg-black h-56 rounded-lg flex items-center justify-center text-white text-sm">
              No Preview Available
            </div>
          )}
        </div>

        <div className="border rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Quotes</h3>

          <p className="text-sm text-gray-400">Wall Art Name</p>
          <p className="font-semibold mb-4">
            {order.wallArtName || order.treeName || "Legacy Wall Art"}
          </p>

          <p className="text-sm text-gray-400 mb-1">Quote on Wall Art</p>
          <p className="text-gray-700 text-sm leading-6 italic">
            {order.quote ? `"${order.quote}"` : "No quote provided"}
          </p>
        </div>

      </div>

    </div>
  );
}