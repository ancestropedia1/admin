export default function QueryDetails() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border space-y-3">

      <h3 className="font-semibold border-b pb-2">
        Query Details
      </h3>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <p>Email: user@gmail.com</p>
        <p>Phone: +91 9876543210</p>
        <p>Location: India</p>

        {/* 🔥 Added */}
        <select className="border p-1 rounded">
          <option>Assigned Agent: Admin</option>
        </select>
      </div>

      <textarea
        className="w-full border rounded p-2"
        rows={4}
        placeholder="Description..."
      />
    </div>
  );
}