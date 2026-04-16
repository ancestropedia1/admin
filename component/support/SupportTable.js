"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Pagination from "./Pagination";

export default function SupportTable({ tickets }) {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const rowsPerPage = 5;
  const totalPages = Math.ceil(tickets.length / rowsPerPage);

  // ✅ Reset page if ticket count changes
  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [tickets, totalPages, page]);

  const paginatedTickets = tickets.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getStatusStyle = (status) => {
    if (status === "Open")
      return "bg-orange-100 text-orange-600";
    if (status === "In Progress")
      return "bg-blue-100 text-blue-600";
    if (status === "Resolved")
      return "bg-green-100 text-green-600";

    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mt-6 md:mt-10 border overflow-hidden">

      {/* HEADER */}
      <div className="bg-[#F6F1E9] border-b px-4 md:px-6 py-4">
        <h2 className="text-lg md:text-xl font-bold">
          Support Tickets
        </h2>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full min-w-[900px]">

          <thead>
            <tr className="bg-[#F6F1E9] border-b text-sm text-gray-700">
              <th className="p-4 text-left">Ticket ID</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedTickets.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-8 text-gray-500">
                  No tickets found
                </td>
              </tr>
            )}

            {paginatedTickets.map((ticket) => (
              <tr
                key={ticket.ticketId}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 text-sm font-medium">
                  {ticket.ticketId}
                </td>

                <td
                  className="p-4 cursor-pointer"
                  onClick={() => {
                    if (ticket.userId) {
                      router.push(
                        `/supportmanagement/user/${ticket.userId}`
                      );
                    }
                  }}
                >
                  <span className="text-blue-600 hover:underline text-sm font-medium">
                    {ticket.userName || "N/A"}
                  </span>
                </td>

                <td className="p-4 text-sm">
                  {ticket.category}
                </td>

                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle(
                      ticket.status
                    )}`}
                  >
                    {ticket.status}
                  </span>
                </td>

                <td className="p-4 text-sm">
                  {ticket.createdAt}
                </td>

                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1 bg-[#E6D8FF] text-[#6B47DC] rounded-md text-xs">
                      Assign
                    </button>

                    <button className="px-3 py-1 bg-[#ffd8da] text-red-500 rounded-md text-xs">
                      Resolve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ================= TABLET VIEW ================= */}
      <div className="hidden md:block lg:hidden p-4 space-y-4">

        {paginatedTickets.length === 0 && (
          <p className="text-center text-gray-500">
            No tickets found
          </p>
        )}

        {paginatedTickets.map((ticket) => (
          <div
            key={ticket.ticketId}
            className="border rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">
                  {ticket.ticketId}
                </p>

                <p
                  className="text-sm text-blue-600 cursor-pointer hover:underline mt-1"
                  onClick={() => {
                    if (ticket.userId) {
                      router.push(
                        `/supportmanagement/user/${ticket.userId}`
                      );
                    }
                  }}
                >
                  {ticket.userName || "N/A"}
                </p>
              </div>

              <span
                className={`px-2 py-1 rounded h-fit text-xs font-medium ${getStatusStyle(
                  ticket.status
                )}`}
              >
                {ticket.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <p>
                <b>Category:</b> {ticket.category}
              </p>

              <p>
                <b>Date:</b> {ticket.createdAt}
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="px-3 py-1 bg-[#E6D8FF] text-[#6B47DC] rounded-md text-xs">
                Assign
              </button>

              <button className="px-3 py-1 bg-[#ffd8da] text-red-500 rounded-md text-xs">
                Resolve
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MOBILE VIEW ================= */}
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
            <div className="flex justify-between items-start gap-2">
              <p className="text-sm font-semibold">
                {ticket.ticketId}
              </p>

              <span
                className={`px-2 py-1 rounded text-[10px] font-medium ${getStatusStyle(
                  ticket.status
                )}`}
              >
                {ticket.status}
              </span>
            </div>

            <p
              className="text-sm text-blue-600 cursor-pointer mt-2"
              onClick={() => {
                if (ticket.userId) {
                  router.push(
                    `/supportmanagement/user/${ticket.userId}`
                  );
                }
              }}
            >
              {ticket.userName || "N/A"}
            </p>

            <p className="text-sm mt-2">
              <b>Category:</b> {ticket.category}
            </p>

            <p className="text-sm mt-1">
              <b>Date:</b> {ticket.createdAt}
            </p>

            <div className="flex gap-2 mt-3 flex-wrap">
              <button className="px-3 py-1 bg-[#E6D8FF] text-[#6B47DC] rounded-md text-xs">
                Assign
              </button>

              <button className="px-3 py-1 bg-[#ffd8da] text-red-500 rounded-md text-xs">
                Resolve
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="px-2 md:px-4 pb-2">
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          tickets={tickets}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  );
}