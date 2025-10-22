export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white rounded shadow p-6 flex flex-col gap-2">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
