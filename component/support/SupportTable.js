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

      <div className="bg-[#F6F1E9] border-b p-4 text-xl font-bold">
        Ticket ID
      </div>

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
          {paginatedTickets.map((ticket, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">

              <td className="p-5">{ticket.ticketId}</td>

              {/* ✅ CLICK HERE */}
              <td
                className="p-5 text-blue-600 cursor-pointer hover:underline"
                onClick={() => router.push(`/supportmanagement/user/${ticket.userId}`)}
              >
                {ticket.userName}
              </td>

              <td className="p-5">{ticket.category}</td>

              <td className="p-5">
                <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-600">
                  {ticket.status}
                </span>
              </td>

              <td className="p-5">{ticket.createdAt}</td>

              <td className="p-5">
                <button className="px-3 py-1 bg-[#E6D8FF] text-[#6B47DC] rounded-md text-xs">
                  Assign
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

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