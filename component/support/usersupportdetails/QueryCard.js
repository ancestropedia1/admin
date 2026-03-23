export default function QueryCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">

      <div className="flex justify-between flex-wrap gap-3">

        <div>
          <p className="font-semibold">Query ID: 827-3854-38</p>
          <p className="text-sm text-gray-600">
            Failed Token Purchase...
          </p>
        </div>

        {/* 🔥 Added from Figma */}
        <div className="text-sm text-gray-500 text-right">
          <p>Created: 15/06/2025</p>
          <p>Last Update: 2 hours ago</p>
          <p>Assigned to: Admin.</p>
        </div>

      </div>

      <div className="flex gap-2 mt-3">
        <span className="bg-blue-100 px-2 py-1 text-xs rounded">
          Open Token Manager
        </span>
        <span className="bg-red-100 px-2 py-1 text-xs rounded">
          High Priority
        </span>
        <span className="bg-orange-100 px-2 py-1 text-xs rounded">
          Pending
        </span>
      </div>
    </div>
  );
}