export default function UserProfileCard() {
  return (
    <div className="bg-[#A8D5C2] p-5 rounded-xl flex flex-col md:flex-row gap-4 items-center md:items-start shadow">

      <img
        src="https://i.pravatar.cc/150?img=3"
        className="w-24 h-24 rounded-lg border-2 border-orange-400"
      />

      <div className="flex-1 text-center md:text-left">
        <h2 className="text-xl font-semibold">
          Gaurav Singh Kushwaha
        </h2>

        <p className="text-sm text-gray-700">ID - 8342788</p>

        <p className="text-xs text-gray-600 mt-1">
          Born: March 15, 1992 • Deoria, UP, India • UI/UX Designer
        </p>
      </div>

      <div>
        <span className="bg-orange-500 text-white px-3 py-1 rounded">
          Token Balance: 190
        </span>
      </div>
    </div>
  );
}