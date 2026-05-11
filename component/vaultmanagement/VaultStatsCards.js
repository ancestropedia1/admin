export default function VaultStatsCards({ stats }) {
  const cards = [
    {
      bg:     "bg-[#D3E7FF]",
      border: "border-[#000ACC]",
      text:   "text-[#000ACC]",
      title:  "Storage Capacity",
      desc:   stats
        ? `Total: ${stats.totalStorageGB} GB used of 5 PB`
        : "Total: 4PB used of 6 PB",
    },
    {
      bg:     "bg-[#FEF2F2]",
      border: "border-[#D32F2F]",
      text:   "text-[#D32F2F]",
      title:  "Storage Alert",
      desc:   stats
        ? `${stats.usersNearingLimit} Users nearing storage limits`
        : "12 Users nearing storage limits",
    },
    {
      bg:     "bg-[#FFF5D3]",
      border: "border-[#FFC300]",
      text:   "text-[#FFC300]",
      title:  "Backup Reminder",
      desc:   "10 Users have not backed up their data",
    },
    {
      bg:     "bg-[#FEF2F2]",
      border: "border-[#D32F2F]",
      text:   "text-[#D32F2F]",
      title:  "Access Denied",
      desc:   "5 Users reported access issues",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`${card.bg} border ${card.border} p-4 shadow-sm rounded-lg`}
        >
          <p className={`text-sm font-bold ${card.text}`}>{card.title}</p>
          <p className={`text-xs ${card.text} mt-1`}>{card.desc}</p>
        </div>
      ))}
    </div>
  );
}