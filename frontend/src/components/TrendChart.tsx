export default function TrendChart({ title }) {
  return (
    <div className="bg-white rounded shadow p-6 h-52 flex flex-col">
      <div className="text-lg font-semibold mb-2">{title}</div>
      <div className="flex-1 flex items-center justify-center text-gray-400">[Chart Here]</div>
      <div className="text-xs text-gray-400 mt-2">Last 12 weeks</div>
    </div>
  );
}
