"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "./Pagination";

export default function SupportTable({ tickets }) {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const rowsPerPage = 5;

  const totalPages = Math.ceil(tickets.length / rowsPerPage);

  const paginatedTickets = tickets.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="bg-white rounded-xl shadow-sm mt-10 overflow-x-auto border">

      {/* HEADER */}
      <div className="bg-[#F6F1E9] border-b p-4 text-xl font-bold">
        Support Tickets
      </div>

      {/* DESKTOP TABLE */}
      <table className="w-full hidden md:table">

        <thead>
          <tr className="bg-[#F6F1E9] border-b">
            <th className="p-5 text-left">Ticket ID</th>
            <th className="p-5 text-left">User</th>
            <th className="p-5 text-left">Category</th>
            <th className="p-5 text-left">Status</th>
            <th className="p-5 text-left">Created</th>
            <th className="p-5 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {paginatedTickets.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-6">
                No tickets found
              </td>
            </tr>
          )}

          {paginatedTickets.map((ticket) => (

            <tr key={ticket.ticketId} className="border-t hover:bg-gray-50">

  {/* ✅ Ticket ID */}
  <td className="p-5">{ticket.ticketId}</td>

  {/* ✅ USER (UPDATED UI) */}
  <td
    className="p-5 cursor-pointer"
    onClick={() => {
      if (ticket.userId) {
        router.push(`/supportmanagement/user/${ticket.userId}`);
      }
    }}
  >
    <div className="flex items-center gap-3">
    

      {/* Name + Email */}
      <div className="flex flex-col">
        <span className="text-blue-600 hover:underline text-sm font-medium">
          {ticket.userName || "N/A"}
        </span>
      </div>

    </div>
  </td>

  {/* CATEGORY */}
  <td className="p-5">{ticket.category}</td>

  {/* STATUS */}
  <td className="p-5">
    <span
      className={`px-2 py-1 rounded text-xs
        ${ticket.status === "Open" && "bg-orange-100 text-orange-600"}
        ${ticket.status === "In Progress" && "bg-blue-100 text-blue-600"}
        ${ticket.status === "Resolved" && "bg-green-100 text-green-600"}
      `}
    >
      {ticket.status}
    </span>
  </td>

  {/* DATE */}
  <td className="p-5">{ticket.createdAt}</td>

  {/* ACTION */}
  <td className="p-5">
    <button className="px-3 py-1 bg-[#E6D8FF] text-[#6B47DC] rounded-md text-xs">
      Assign
    </button>

    <button className="px-3 py-1 ml-2 bg-[#ffd8da] text-red-500 rounded-md text-xs">
      Resolve
    </button>
  </td>

</tr>

          ))}
        </tbody>

      </table>

      {/* MOBILE VIEW */}
      <div className="md:hidden p-4 space-y-3">

        {paginatedTickets.length === 0 && (
          <p className="text-center text-gray-500">
            No tickets found
          </p>
        )}

        {paginatedTickets.map((ticket) => (

          <div
            key={ticket.ticketId}
            className="border rounded-lg p-4 shadow-sm"
          >
            <p className="text-sm"><b>ID:</b> {ticket.ticketId}</p>

            <p
              className="text-sm text-blue-600 cursor-pointer"
              onClick={() => {
                if (ticket.userId) {
                  router.push(`/supportmanagement/user/${ticket.userId}`);
                }
              }}
            >
              <b>User:</b> {ticket.userName || "N/A"}
            </p>

            <p className="text-sm"><b>Category:</b> {ticket.category}</p>

            <p className="text-sm">
              <b>Status:</b>{" "}
              <span
                className={`px-2 py-1 rounded text-xs
                  ${ticket.status === "Open" && "bg-orange-100 text-orange-600"}
                  ${ticket.status === "In Progress" && "bg-blue-100 text-blue-600"}
                  ${ticket.status === "Resolved" && "bg-green-100 text-green-600"}
                `}
              >
                {ticket.status}
              </span>
            </p>

            <p className="text-sm"><b>Date:</b> {ticket.createdAt}</p>

            <button className="mt-2 px-3 py-1 bg-[#E6D8FF] text-[#6B47DC] rounded-md text-xs">
              Assign
            </button>
          </div>

        ))}

      </div>

      {/* PAGINATION */}
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        tickets={tickets}
        rowsPerPage={rowsPerPage}
      />

    </div>
  );
}