export default function UserProfileCard({ user }) {

  if (!user) {
    return (
      <div className="bg-gray-100 p-5 rounded-xl">
        Loading user...
      </div>
    );
  }

  return (
    <div className="bg-[#A8D5C2] p-5 rounded-xl flex flex-col md:flex-row gap-4 items-center md:items-start shadow-sm">

      {/* PROFILE IMAGE */}
      <img
        src={user.profilePicture || "https://i.pravatar.cc/150?img=3"}
        alt="profile"
        className="w-24 h-24 rounded-lg border-2 border-orange-400 object-cover"
      />

      {/* USER INFO */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          {user.firstName || "First"} {user.lastName || "Last"}
        </h2>

        {/* USER ID */}
        <p className="text-sm text-gray-700 mt-1">
          ID - {user._id ? user._id.slice(-6) : "N/A"}
        </p>

        {/* EXTRA INFO */}
        <p className="text-xs text-gray-600 mt-1">
          {user.bio || "No additional info available"}
        </p>

        {/* OPTIONAL */}
        <p className="text-xs text-gray-500 mt-1">
          {user.location ? `${user.location} • ` : ""}
          {user.role || ""}
        </p>
      </div>

      {/* TOKEN */}
      <div>
        <span className="bg-orange-500 text-white px-4 py-1 rounded-md text-sm shadow">
          Token Balance: {user.tokens ?? 0}
        </span>
      </div>
    </div>
  );
}