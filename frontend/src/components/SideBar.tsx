"use client"; // Required for client-side features like usePathname and useRouter

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBox, FaCalendarAlt, FaUsers, FaStar, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";

const navItems = [
  { icon: <FaChartBar />, label: "Dashboard", href: "/admin/dashboard" },
  { icon: <FaBox />, label: "Products", href: "/admin/products" },
  { icon: <FaCalendarAlt />, label: "Bookings", href: "/admin/bookings" },
  { icon: <FaUsers />, label: "Customers", href: "/customers" },
  { icon: <FaStar />, label: "Reviews", href: "/reviews" },
  { icon: <FaChartBar />, label: "Reports", href: "/reports" },
  { icon: <FaCog />, label: "Settings", href: "/settings" },
  {
    icon: <FaSignOutAlt />,
    label: "Logout",
    href: "/login",
    onClick: (router) => {
      // Placeholder for logout logic (e.g., clear auth tokens)
      console.log("Logging out...");
      localStorage.removeItem("authToken"); // Example: Clear token
      router.push("/"); // Redirect to home or login page
    },
  },
];

export default function SideBar() {
  const pathname = usePathname(); // Get current route
  const router = useRouter(); // Get router for navigation

  return (
    <aside className="bg-white w-60 min-h-screen p-6 shadow flex flex-col">
      <div className="font-bold text-lg mb-8">Rajmahal Admin</div>
      <nav role="navigation" className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={item.onClick ? () => item.onClick(router) : undefined} // Pass router to onClick if defined
            className={`flex items-center gap-3 px-2 py-2 rounded cursor-pointer hover:bg-gray-100 ${
              pathname === item.href ? "bg-gray-200 font-bold" : ""
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}