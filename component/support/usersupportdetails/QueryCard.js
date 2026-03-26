"use client";

export default function QueryCard({ ticket }) {

  if (!ticket) {
    return (
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border space-y-4">

      {/* TOP SECTION */}
      <div className="flex justify-between flex-wrap gap-4">

        {/* LEFT */}
        <div>
          <p className="font-semibold text-gray-800">
            Query ID: {ticket._id?.slice(-8)}
          </p>

          <p className="text-sm text-gray-600 mt-1">
            {ticket.subject || "No subject"}
          </p>
        </div>

        {/* RIGHT */}
        <div className="text-sm text-gray-500 text-right space-y-1">

          <p>
            Created:{" "}
            {ticket.createdAt
              ? new Date(ticket.createdAt).toLocaleDateString()
              : "N/A"}
          </p>

          <p>
            Last Update:{" "}
            {ticket.updatedAt
              ? new Date(ticket.updatedAt).toLocaleTimeString()
              : "N/A"}
          </p>

          <p>
            Assigned to:{" "}
            {ticket.assignedTo?.firstName || "Unassigned"}
          </p>

        </div>

      </div>

      {/* TAGS / BADGES */}
      <div className="flex flex-wrap gap-2">

        {/* CATEGORY */}
        <span className="bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full">
          {ticket.category || "General"}
        </span>

        {/* PRIORITY */}
        <span
          className={`px-3 py-1 text-xs rounded-full ${
            ticket.priority === "High"
              ? "bg-red-100 text-red-600"
              : ticket.priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {ticket.priority || "Medium"} Priority
        </span>

        {/* STATUS */}
        <span
          className={`px-3 py-1 text-xs rounded-full ${
            ticket.status === "Resolved"
              ? "bg-green-100 text-green-700"
              : ticket.status === "In Progress"
              ? "bg-orange-100 text-orange-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {ticket.status || "Open"}
        </span>

      </div>

    </div>
  );
}