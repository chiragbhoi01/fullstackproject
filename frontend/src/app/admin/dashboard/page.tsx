import { SideBar, Topbar, StatsCard, TrendChart } from "@/components";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <main className="flex-1 p-8">
        <Topbar />
        <section className="grid grid-cols-4 gap-6 mt-8">
          <StatsCard title="Total Rentals (This Month)" value="128" />
          <StatsCard title="Revenue (This Month)" value="₹3,45,200" />
          <StatsCard title="Revenue (Last Month)" value="₹3,02,450" />
          <StatsCard title="Change" value="+14.1%" />
        </section>
        <section className="grid grid-cols-2 gap-6 mt-8">
          <TrendChart title="Total Rentals Trend" />
          <TrendChart title="Revenue Comparison" />
        </section>
      </main>
    </div>
  );
}
