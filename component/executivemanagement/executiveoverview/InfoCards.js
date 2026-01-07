export default function InfoCards({ executive }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <div className="bg-orange-400 text-white p-5 rounded-xl">
        <h4 className="font-semibold">Personal Details</h4>
        <p>Email: {executive.email}</p>
        <p>Phone: {executive.phone || "—"}</p>
        <p>Joined: {new Date(executive.createdAt).toDateString()}</p>
      </div>

      <div className="bg-purple-500 text-white p-5 rounded-xl">
        <h4 className="font-semibold">Account Summary</h4>
        <p>ID: {executive._id}</p>
        <p>Role: {executive.role}</p>
      </div>

      <div className="bg-yellow-400 text-white p-5 rounded-xl">
        <h4 className="font-semibold">This Month</h4>
        <p>Performance: Excellent</p>
      </div>
    </div>
  );
}
