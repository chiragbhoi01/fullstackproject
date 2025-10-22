export default function Topbar() {
  return (
    <header className="flex items-center justify-between py-4 px-8 bg-white shadow-sm">
      <input className="border rounded px-3 py-2 w-1/3" placeholder="Search products, customers, bookings" />
      <div className="flex items-center gap-4">
        <button className="border px-4 py-2 rounded bg-gray-50">Notifications</button>
        <button className="px-4 py-2 rounded border">+ New Product</button>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded">+ New Booking</button>
        <span className="rounded-full overflow-hidden w-10 h-10 border-2 border-gray-200">
          <img src="/assets/user.jpg" alt="User" />
        </span>
        <span>A. Sharma</span>
      </div>
    </header>
  );
}
