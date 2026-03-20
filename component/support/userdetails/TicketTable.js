"use client";

export default function TicketTable({ tickets = [] }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="w-full text-sm">

        {/* HEADER */}
        <thead className="bg-[#EAE4DC]">
          <tr>
            <th className="p-4 text-left">Ticket ID</th>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Agent</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>

          {tickets.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-6">
                No tickets found
              </td>
            </tr>
          )}

          {tickets.map((ticket) => (

            <tr key={ticket._id} className="border-t hover:bg-gray-50">

              {/* ID */}
              <td className="p-4">
                #{ticket._id.slice(-4)}
              </td>

              {/* TITLE */}
              <td className="p-4">
                {ticket.subject}
              </td>

              {/* CATEGORY */}
              <td className="p-4">
                {ticket.category}
              </td>

              {/* STATUS */}
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded text-xs
                    ${ticket.status === "Open" && "bg-red-100 text-red-600"}
                    ${ticket.status === "In Progress" && "bg-blue-100 text-blue-600"}
                    ${ticket.status === "Resolved" && "bg-green-100 text-green-600"}
                  `}
                >
                  {ticket.status}
                </span>
              </td>

              {/* DATE */}
              <td className="p-4">
                {new Date(ticket.createdAt).toLocaleDateString()}
              </td>

              {/* AGENT */}
              <td className="p-4">
                {ticket.assignedTo ? (
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs">
                    {ticket.assignedTo.name || "Agent"}
                  </span>
                ) : (
                  <span className="text-gray-400 text-xs">
                    Not Assigned
                  </span>
                )}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}