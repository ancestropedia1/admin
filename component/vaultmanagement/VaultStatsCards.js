export default function VaultStatsCards({
  stats,
}) {
  const cards = [
    {
      title: "Storage Capacity",
      value: `${stats?.totalStorageGB || 0} GB`,
      desc: "Total used storage",
      color: "bg-[#DCEBFF]",
    },
    {
      title: "Storage Alert",
      value:
        stats?.usersNearingLimit || 0,
      desc: "Users nearing limits",
      color: "bg-[#FFE5E5]",
    },
    {
      title: "Backup Reminder",
      value: "10",
      desc: "Users not backed up",
      color: "bg-[#FFF5D6]",
    },
    {
      title: "Access Denied",
      value: "5",
      desc: "Access issues",
      color: "bg-[#FFECEC]",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`${card.color} rounded-xl border p-5 shadow-sm`}
        >
          <p className="text-sm font-semibold">
            {card.title}
          </p>

          <h2 className="text-2xl font-bold mt-3">
            {card.value}
          </h2>

          <p className="text-xs text-gray-600 mt-2">
            {card.desc}
          </p>
        </div>
      ))}
    </div>
  );
}