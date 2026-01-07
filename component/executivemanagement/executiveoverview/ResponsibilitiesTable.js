export default function ResponsibilitiesTable() {
  return (
    <div className="bg-white rounded-2xl mt-8">
      <div className="p-4 font-semibold border-b bg-[#F6F1E9]">
        Assigned Responsibilities
      </div>

      <table className="w-full text-sm">
        <thead className="bg-[#F6F1E9]">
          <tr>
            <th className="p-3 text-left">Task</th>
            <th className="p-3 text-left">Module</th>
            <th className="p-3 text-left">Deadline</th>
            <th className="p-3 text-left">Progress</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-t">
            <td className="p-3">Review Blog Posts</td>
            <td className="p-3">Blog</td>
            <td className="p-3">Oct 25, 2024</td>
            <td className="p-3">40%</td>
            <td className="p-3">
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                Pending
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
