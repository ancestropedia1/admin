export default function QueryHistory() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">

      <h3 className="font-semibold mb-3">
        Query History
      </h3>

      <ul className="space-y-2 text-sm">
        <li>✔ Query Created</li>
        <li>✔ Assigned to Admin</li>
        <li>✔ Status Updated</li>
        <li>⚪ Resolution Pending</li>
      </ul>

    </div>
  );
}