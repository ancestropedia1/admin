export default function UserCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-xl font-semibold mt-1">{value}</h3>
    </div>
  );
}