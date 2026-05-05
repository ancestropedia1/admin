import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, Tooltip,
} from "recharts";

export default function WeeklyRevenueChart({ data = [] }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="font-semibold text-gray-700 mb-4">
        Total Revenue (Last 4 Weeks)
      </h2>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#6C63FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6C63FF"
              fill="url(#colorRev)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}