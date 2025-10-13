"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

interface HButtonProps {
  children: string;
  isActive?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const HeaderButton = ({
  children,
  isActive = false,
  className = "",
  icon,
}: HButtonProps) => {
  return (
    <button
      className={`font-serif rounded-2xl px-4 py-2 transition-colors ${
        isActive ? "bg-rose-700 text-white" : "hover:bg-rose-400"
      } ${className}`}
    >
      {icon && <span className="mr-2 inline-block">{icon}</span>}
      {children}
    </button>
  );
};

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navTabs = [
    { href: "/", label: "Home" },
    { href: "/bridalwear", label: "Bridal Wear" },
    { href: "/groomwear", label: "Groom Wear" },
    { href: "/gallery", label: "Gallery" },
    { href: "/offers", label: "Offers" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 px-6 py-4 md:px-8 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" passHref>
        <span className="text-2xl font-bold text-rose-700 cursor-pointer select-none">
          💍 Rajmahal Udaipur Rentals
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
        {navTabs.map(({ href, label }) => (
          <Link key={href} href={href} passHref>
            <span>
              <HeaderButton isActive={pathname === href}>{label}</HeaderButton>
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-700 hover:text-rose-700 focus:outline-none"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col space-y-2 py-4 md:hidden">
          {navTabs.map(({ href, label }) => (
            <Link key={href} href={href} passHref>
              <span
                onClick={() => setMobileMenuOpen(false)}
                className="block px-6"
              >
                <HeaderButton isActive={pathname === href} className="w-full text-left">
                  {label}
                </HeaderButton>
              </span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
