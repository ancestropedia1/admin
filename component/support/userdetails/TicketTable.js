export default function TicketTable() {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
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

        <tbody>
          {["Open", "In Progress", "Resolved"].map((status, i) => (
            <tr key={i} className="border-t">
              <td className="p-4">#3834</td>
              <td className="p-4">Issue with DNA report</td>
              <td className="p-4">DNA Kit</td>

              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    status === "Open"
                      ? "bg-red-100 text-red-600"
                      : status === "Resolved"
                      ? "bg-green-100 text-green-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {status}
                </span>
              </td>

              <td className="p-4">18/08/2025</td>

              <td className="p-4">
                <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs">
                  Divyanshu
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}