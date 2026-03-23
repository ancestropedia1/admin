export default function ChatSection() {
  return (
    <div className="bg-[#DFF2E1] rounded-xl p-5 shadow-sm border">

      <h3 className="font-semibold mb-3">
        Communications History
      </h3>

      <div className="space-y-3 max-h-60 overflow-y-auto">

        <div className="bg-white p-3 rounded">
          <p className="font-semibold">User</p>
          <p>I bought tokens but not added</p>
        </div>

        <div className="bg-white p-3 rounded">
          <p className="font-semibold">Admin</p>
          <p>We are checking</p>
        </div>

      </div>

      {/* 🔥 Added input */}
      <div className="flex gap-2 mt-3">
        <input className="flex-1 border p-2 rounded" />
        <button className="bg-green-700 text-white px-4 rounded">
          Send
        </button>
      </div>

    </div>
  );
}