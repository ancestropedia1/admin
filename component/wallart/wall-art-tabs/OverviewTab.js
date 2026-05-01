"use client";

export default function OverviewTab({ order }) {
  const timeline = order.adminTimeline || [];

  return (
    <div className="grid md:grid-cols-2 gap-6">

      <div className="border rounded-xl p-5">
        <h3 className="font-semibold mb-4">
          Order Status Timeline
        </h3>

        {timeline.length > 0 ? (
          timeline.map((t, i) => (
            <div key={i} className="mb-3">
              <p className="font-medium capitalize">{t.status}</p>
              <p className="text-xs text-gray-400">
                {new Date(t.updatedAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No timeline</p>
        )}
      </div>

      <div className="border rounded-xl p-5">
        <h3 className="font-semibold mb-4">Order Summary</h3>

        <p><b>Name:</b> {order.userId?.name}</p>
        <p><b>Email:</b> {order.userId?.email}</p>
        <p><b>Price:</b> ₹{order.totalPrice}</p>
      </div>
    </div>
  );
}