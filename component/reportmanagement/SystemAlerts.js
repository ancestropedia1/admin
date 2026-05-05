export default function SystemAlerts({ stats }) {
  const alertCards = [
    {
      title:     "Storage Alert",
      iconColor: "bg-red-100 text-red-600",
      desc:      "100 TB left, Immediate action required.",
    },
    {
      title:     "Shipping Delays",
      iconColor: "bg-yellow-100 text-yellow-600",
      desc:      `${stats?.cards?.dnaKitsOrdered || 0} DNA kits ordered total.`,
    },
    {
      title:     "User Token Request",
      iconColor: "bg-blue-100 text-blue-600",
      desc:      `${stats?.tokenBreakdown?.[1]?.value || 0} token requests pending.`,
    },
    {
      title:     "Support Queries",
      iconColor: "bg-green-100 text-green-600",
      desc:      "400 unresolved help support queries.",
    },
  ];

  return (
    <div className="bg-[#FBF7EF] shadow-md rounded-xl p-4">
      <h2 className="font-semibold text-gray-700 mb-3">System Alerts</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {alertCards.map((alert, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-white shadow-sm flex gap-3 items-start"
          >
            <div className={`p-2 rounded-lg ${alert.iconColor} font-bold text-lg`}>
              !
            </div>
            <div>
              <p className="font-semibold">{alert.title}</p>
              <p className="text-gray-500 text-sm">{alert.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}