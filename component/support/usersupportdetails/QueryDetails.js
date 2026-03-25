"use client";

export default function QueryDetails({ ticket }) {

  if (!ticket) {
    return (
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border space-y-4">

      {/* HEADER */}
      <h3 className="font-semibold text-lg border-b pb-2">
        Query details
      </h3>

      {/* TOP INFO */}
      <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700">

        <div>
          <p className="font-medium text-gray-600">Email</p>
          <p>{ticket.email || ticket.user?.email || "N/A"}</p>
        </div>

        <div>
          <p className="font-medium text-gray-600">Phone</p>
          <p>{ticket.user?.phone || "N/A"}</p>
        </div>

        <div>
          <p className="font-medium text-gray-600">Location</p>
          <p>{ticket.user?.location || "N/A"}</p>
        </div>

        {/* ASSIGNED AGENT */}
        <div>
          <p className="font-medium text-gray-600 mb-1">Assigned Agent</p>
          <select
            className="w-full border rounded p-2 text-sm"
            value={ticket.assignedTo?._id || ""}
            disabled
          >
            <option>
              {ticket.assignedTo?.firstName || "Unassigned"}
            </option>
          </select>
        </div>

      </div>

      {/* DESCRIPTION */}
      <div>
        <p className="font-medium text-gray-600 mb-1">
          Query Description
        </p>

        <div className="bg-gray-50 border rounded p-3 text-sm text-gray-700 whitespace-pre-line">
          {ticket.message || "No description available"}
        </div>
      </div>

      {/* FOOTER DATES */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 pt-2">

        <div>
          <p className="font-medium">Date created</p>
          <p>
            {ticket.createdAt
              ? new Date(ticket.createdAt).toLocaleString()
              : "N/A"}
          </p>
        </div>

        <div>
          <p className="font-medium">Last Update</p>
          <p>
            {ticket.updatedAt
              ? new Date(ticket.updatedAt).toLocaleString()
              : "N/A"}
          </p>
        </div>

      </div>

    </div>
  );
}