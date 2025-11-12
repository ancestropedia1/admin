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
  Grid,
  User,
  FileText,
  Archive,
  LogOut,
  Box,
} from "lucide-react";

const alerts = [
    {
      icon: <AlertTriangle className="text-yellow-600" />,
      title: "Storage Warning",
      desc: "Heritage Vault is 78% full. Consider upgrading storage capacity.",
      bg: "bg-[#FEFCE8]",
    },
    {
      icon: <Package className="text-orange-600" />,
      title: "Pending Shipments",
      desc: "23 DNA kits awaiting shipment approval.",
      bg: "bg-[#FFF7ED]",
    },
    {
      icon: <MessageCircle className="text-red-600" />,
      title: "Support Tickets",
      desc: "7 unresolved support tickets require attention.",
      bg: "bg-[#FEF2F2]",
    },
  ];


const SystemAlert = () => {
  return (
    <div className="xl:col-span-2 bg-white rounded-2xl p-6 mr-5  mt-15 shadow-lg border border-[#E6E6E6]" style={{width:376, height:452}}>
              <h3 className="text-lg font-semibold border-gray-300 border-b pb-4 ">System Alerts</h3>
              {alerts.map((a, i) => (
                <div key={i} className={`${a.bg} p-6  rounded-lg border h-24  mt-4 shadow-md  text-xl border-[#F0F0F0] flex items-center`}>
                  <div className="flex items-start gap-1">
                    <div className="p-2 mr-0.5 text-xs rounded-md bg-white/60">{a.icon}</div>
                    <div>
                      <div className="font-medium text-sm text-[#A16207]">{a.title}</div>
                      <p className="text-xs text-[#A16207] ">{a.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
  )
}

export default SystemAlert