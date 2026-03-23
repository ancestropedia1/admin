export default function StatusManagement() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border space-y-3">

      <h3 className="font-semibold">Status Management</h3>

      <select className="w-full border p-2 rounded">
        <option>Processing</option>
      </select>

      <select className="w-full border p-2 rounded">
        <option>Assigned: Admin</option>
      </select>

      <select className="w-full border p-2 rounded">
        <option>High Priority</option>
      </select>

      {/* 🔥 Added */}
      <select className="w-full border p-2 rounded">
        <option>Token Type: DAN Order</option>
      </select>

      <textarea
        className="w-full border p-2 rounded"
        placeholder="Write comments..."
      />

      <button className="w-full bg-green-800 text-white p-2 rounded">
        Save Changes
      </button>

    </div>
  );
}