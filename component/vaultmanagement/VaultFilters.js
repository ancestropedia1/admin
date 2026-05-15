import { Search } from "lucide-react";

export default function VaultFilters({
  search,
  onSearch,
}) {
  return (
    <div className="bg-white rounded-xl border p-4 flex flex-col md:flex-row justify-between gap-4">

      <div className="flex gap-3">
        <button className="px-4 py-2 rounded-lg border bg-[#F7F7F7] text-sm">
          By Date
        </button>

        <button className="px-4 py-2 rounded-lg border bg-[#F7F7F7] text-sm">
          By Status
        </button>
      </div>

      <div className="flex items-center bg-[#F7F7F7] rounded-lg px-3 py-2 w-full md:w-[300px]">
        <Search
          size={16}
          className="text-gray-400"
        />

        <input
          value={search}
          onChange={(e) =>
            onSearch(e.target.value)
          }
          placeholder="Search user..."
          className="bg-transparent outline-none ml-2 w-full text-sm"
        />
      </div>
    </div>
  );
}