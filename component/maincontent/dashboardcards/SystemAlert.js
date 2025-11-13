"use client";

import { AlertTriangle, Package, MessageCircle } from "lucide-react";

const alerts = [
  {
    icon: <AlertTriangle className="text-yellow-600" size={18} />,
    title: "Storage Warning",
    desc: "Heritage Vault is 78% full. Consider upgrading storage.",
    bg: "bg-[#FEFCE8]",
  },
  {
    icon: <Package className="text-orange-600" size={18} />,
    title: "Pending Shipments",
    desc: "23 DNA kits awaiting shipment approval.",
    bg: "bg-[#FFF7ED]",
  },
  {
    icon: <MessageCircle className="text-red-600" size={18} />,
    title: "Support Tickets",
    desc: "7 unresolved support tickets require attention.",
    bg: "bg-[#FEF2F2]",
  },
];

const SystemAlert = () => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-[#E6E6E6] w-full lg:h-[452px] min-h-40">
      <h3 className="text-lg font-semibold border-gray-300 border-b pb-4">System Alerts</h3>
      <div className="space-y-3 sm:space-y-4 mt-4">
        {alerts.map((a, i) => (
          <div key={i} className={`${a.bg} p-4 sm:p-6 rounded-lg border shadow-md border-[#F0F0F0] flex items-center`}>
            <div className="flex items-start gap-3 w-full">
              <div className="p-2 rounded-md bg-white/60 shrink-0">{a.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-[#A16207]">{a.title}</div>
                <p className="text-xs text-[#A16207] mt-1">{a.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SystemAlert