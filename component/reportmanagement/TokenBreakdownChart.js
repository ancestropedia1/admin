import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export default function TokenBreakdownChart({ data = [] }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="font-semibold text-gray-700 mb-4">
        Token Revenue Breakdown
      </h2>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%" cy="50%"
              innerRadius={45} outerRadius={75}
              paddingAngle={4} dataKey="value"
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex gap-4 justify-center text-xs mt-2">
        {data.map((e, i) => (
          <span key={i} className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ background: e.color }}
            />
            {e.name}: {e.value}
          </span>
        ))}
      </div>
    </div>
  );
}