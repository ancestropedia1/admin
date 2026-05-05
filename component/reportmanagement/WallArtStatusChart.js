import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#27ae60", "#F6B93B", "#7868E6", "#e67e22"];

export default function WallArtStatusChart({ data = [] }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="font-semibold text-gray-700 mb-4">
        Wall Art Order Status
      </h2>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%" cy="50%"
              innerRadius={60} outerRadius={80}
              paddingAngle={3} dataKey="value"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center text-xs mt-2">
        {data.map((e, i) => (
          <span key={i} className="flex items-center gap-1 capitalize">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ background: COLORS[i % COLORS.length] }}
            />
            {e.name}: {e.value}
          </span>
        ))}
      </div>
    </div>
  );
}