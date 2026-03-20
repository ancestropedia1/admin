export default function UserProfileCard({ user }) {
  return (
    <div className="bg-[#A8D5C2] p-5 rounded-xl flex flex-col md:flex-row gap-4 items-center md:items-start shadow">

      {/* PROFILE IMAGE */}
      <img
        src={
          user?.profilePicture ||
          "https://i.pravatar.cc/150?img=3"
        }
        className="w-24 h-24 rounded-lg border-2 border-orange-400"
      />

      {/* USER INFO */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-xl font-semibold">
          {user?.firstName} {user?.lastName}
        </h2>

        {/* ✅ USER ID */}
        <p className="text-sm text-gray-700">
          ID - {user?._id?.slice(-6) || "N/A"}
        </p>

        <p className="text-xs text-gray-600 mt-1">
          {user?.bio || "No additional info available"}
        </p>
      </div>

      {/* TOKENS */}
      <div>
        <span className="bg-orange-500 text-white px-3 py-1 rounded">
          Token Balance: {user?.tokens || 0}
        </span>
      </div>
    </div>
  );
}