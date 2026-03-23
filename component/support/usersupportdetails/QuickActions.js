export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border space-y-3">

      <h3 className="font-semibold">Quick Actions</h3>

      <button className="w-full bg-[#8B4513] text-white p-2 rounded">
        Schedule Call
      </button>

      <button className="w-full bg-yellow-400 p-2 rounded">
        Send Email
      </button>

      <button className="w-full bg-green-700 text-white p-2 rounded">
        Escalate
      </button>

    </div>
  );
}