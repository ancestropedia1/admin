"use client";

import Image from "next/image";

const cards = [
  { title: "Heritage Vault", value: "7.8 TB", percent: "78%", color: "bg-blue-500", icon:"/heritage-card-icon.svg" },
  { title: "Token Sold", value: "98,234", percent: "15%", color: "bg-teal-500", icon: "/token-sold-card-icon.svg" },
  { title: "Wall Art Order", value: "456", percent: "12 Pending", color: "bg-purple-500", icon: "/wall-art-card-icon.svg" },
  { title: "Total Users", value: "24,847", percent: "↑ 12%", color: "bg-orange-400", icon: "/user-count-card-icon.svg" },
  { title: "Active Family Trees", value: "15,632", percent: "↑ 8%", color: "bg-yellow-400", icon: "/active-tree-card-icon.svg" },
  { title: "DNA Kits Ordered", value: "1,847", percent: "↑ 23 Pending", color: "bg-pink-400", icon: "/kit-order-card-icon.svg" },
];

const OverView = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg  border-[#E6E6E6]  sm:p-6">

      <div className="border-b border-gray-300 mb-3">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Overview</h2>
      </div>
      
      {/* Mobile: horizontal scroll, Desktop: flex layout */}
      <div className="flex overflow-x-auto pb-4 space-x-4 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:gap-6 sm:overflow-x-visible sm:pb-0 sm:space-x-0">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`
              ${card.color} text-white p-3 rounded-2xl shadow-lg relative overflow-hidden 
              shrink-0 w-[280px] sm:w-full
              min-h-[160px] flex flex-col justify-between
            `}
          >
            <div className="flex justify-between items-start">
              <div className="bg-white/90 p-2 rounded-md shadow-sm inline-flex items-center justify-center">
              <Image src={card.icon} alt={card.title} width={20} height={20} />
              
              </div>
              <div className="text-xs font-medium opacity-90 bg-white/20 px-2 py-1 rounded-md">
                {card.percent}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-xl sm:text-2xl font-semibold">{card.value}</div>
              <div className="text-sm opacity-90 mt-1">{card.title}</div>
            </div>

            {/* Progress bar for first card, placeholder for consistent spacing in other cards */}
            {i === 0 ? (
              <div className="absolute bottom-4 left-4 right-4 h-2 rounded-full bg-white/40">
                <div className="h-2 rounded-full bg-yellow-400 w-[78%]"></div>
              </div>
            ) : (
              <div className="h-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default OverView;