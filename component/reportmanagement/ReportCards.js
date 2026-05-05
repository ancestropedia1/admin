import {
  Users, Database, Wallet,
  Image as ImageIcon, TreeDeciduous, FlaskConical,
} from "lucide-react";

export default function ReportCards({ cards }) {
  if (!cards) return null;

  const cardData = [
    {
      title:  "Total Users",
      number: cards.totalUsers?.toLocaleString(),
      bg:     "#FFE5D0",
      iconBg: "bg-orange-500",
      icon:   <Users size={22} className="text-white" />,
    },
    {
      title:  "Heritage Folders",
      number: cards.heritageFolders?.toLocaleString(),
      bg:     "#D0E7FF",
      iconBg: "bg-blue-500",
      icon:   <Database size={22} className="text-white" />,
    },
    {
      title:  "Tokens Sold",
      number: cards.tokensSold?.toLocaleString(),
      bg:     "#DFFFD6",
      iconBg: "bg-green-500",
      icon:   <Wallet size={22} className="text-white" />,
    },
    {
      title:  "Wall Art Orders",
      number: cards.wallArtOrders?.toLocaleString(),
      bg:     "#E9D1FF",
      iconBg: "bg-purple-500",
      icon:   <ImageIcon size={22} className="text-white" />,
    },
    {
      title:  "Active Family Trees",
      number: cards.activeFamilyTrees?.toLocaleString(),
      bg:     "#FFF1C8",
      iconBg: "bg-yellow-500",
      icon:   <TreeDeciduous size={22} className="text-white" />,
    },
    {
      title:  "DNA Kits Ordered",
      number: cards.dnaKitsOrdered?.toLocaleString(),
      bg:     "#FFD6E7",
      iconBg: "bg-pink-500",
      icon:   <FlaskConical size={22} className="text-white" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
      {cardData.map((item, i) => (
        <div
          key={i}
          className="rounded-2xl p-5 shadow-md transition hover:scale-[1.02] hover:shadow-lg duration-200"
          style={{ background: item.bg }}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconBg}`}>
            {item.icon}
          </div>
          <div className="mt-4 text-3xl font-bold">{item.number}</div>
          <div className="text-gray-700 text-sm font-medium">{item.title}</div>
        </div>
      ))}
    </div>
  );
}