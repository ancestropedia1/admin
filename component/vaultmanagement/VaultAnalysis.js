export default function VaultAnalysis({
  stats,
}) {
  const analysis = stats?.analysis;

  return (
    <div className="bg-[#EDF8F1] rounded-2xl border p-6">

      <h2 className="text-2xl font-bold text-[#1B4332] mb-5">
        Vault Usage Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {/* CARD */}
        <div className="bg-white rounded-xl p-4 border">
          <p className="text-sm font-semibold">
            Storage Used
          </p>

          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-[#1D7A48] rounded-full"
              style={{
                width: `${analysis?.storageUsedPct || 0}%`,
              }}
            />
          </div>

          <p className="mt-3 text-lg font-bold text-[#1D7A48]">
            {analysis?.storageUsedPct || 0}%
          </p>
        </div>

        {/* TOTAL FILES */}
        <div className="bg-white rounded-xl p-4 border">
          <p className="text-sm font-semibold">
            Total Files
          </p>

          <h2 className="text-3xl font-bold text-[#4263EB] mt-4">
            {analysis?.totalFiles || 0}
          </h2>
        </div>
      </div>
    </div>
  );
}