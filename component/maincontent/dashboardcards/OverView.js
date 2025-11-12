"use client";

import {
  Bell,
  Search,
  AlertTriangle,
  Package,
  MessageCircle,
  HardDrive,
  Users,
  Coins,
  ImageIcon,
  Network,
  FlaskConical,
} from "lucide-react";

import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });
const cards = [
    {
      title: "Heritage Vault",
      value: "7.8 TB",
      percent: "78%",
      color: "bg-blue-500",
      icon: <HardDrive size={20} className="text-white" />,
    },
    {
      title: "Token Sold",
      value: "98,234",
      percent: "15%",
      color: "bg-teal-500",
      icon: <Coins size={20} className="text-white" />,
    },
    {
      title: "Wall Art Order",
      value: "456",
      percent: "12 Pending",
      color: "bg-purple-500",
      icon: <ImageIcon size={20} className="text-white" />,
    },
    {
      title: "Total Users",
      value: "24,847",
      percent: "↑ 12%",
      color: "bg-orange-400",
      icon: <Users size={20} className="text-white" />,
    },
    {
      title: "Active Family Trees",
      value: "15,632",
      percent: "↑ 8%",
      color: "bg-yellow-400",
      icon: <Network size={20} className="text-white" />,
    },
    {
      title: "DNA Kits Ordered",
      value: "1,847",
      percent: "↑ 23 Pending",
      color: "bg-pink-400",
      icon: <FlaskConical size={20} className="text-white" />,
    },
  ];

  

const OverView = () => {
  return (
     <div className=" mt-15 ml-4">
            {/* Cards Section */}
            <div className="xl:col-span-3 bg-white rounded-2xl shadow-lg border border-[#E6E6E6] p-6" style={{width:703, height:452}}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, i) => (
                  <div
                    key={i}
                    className={`${card.color} text-white p-4 rounded-2xl shadow-lg relative overflow-hidden`}
                    style={{ minWidth: 212, minHeight: 190 }}
                  >
                    {/* icon box top-left */}
                    <div className="flex justify-between items-start">
                      <div className="bg-white/90 p-2 rounded-md shadow-sm inline-flex items-center justify-center">
                        {card.icon}
                      </div>

                      {/* percent badge */}
                      <div className="text-xs font-medium opacity-90 bg-white/20 px-2 py-1 rounded-md">
                        {card.percent}
                      </div>
                    </div>

                    {/* content */}
                    <div className="mt-6">
                      <div className="text-2xl font-semibold">{card.value}</div>
                      <div className="text-sm opacity-90 mt-1">{card.title}</div>
                    </div>

                    {/* small decorative bar (first card had it) */}
                    {i === 0 && (
                      <div className="absolute bottom-4 left-6 right-6 h-2 rounded-full bg-white/40">
                        <div className="h-2 rounded-full bg-yellow-400 w-[78%]"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
    </div>
  )
}

export default OverView