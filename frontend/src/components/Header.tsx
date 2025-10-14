"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { MdSupervisorAccount } from "react-icons/md";

interface NavTab {
  href: string;
  label: string;
}

interface HButtonProps {
  children: string;
  isActive?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const HeaderButton = ({ children, isActive = false, className = "", icon }: HButtonProps) => {
  return (
    <button
      className={`flex items-center font-['Space_Grotesk',sans-serif] rounded-2xl px-4 py-2 transition-colors ${
        isActive ? "bg-teal-600 text-white" : "hover:bg-teal-100 text-gray-700"
      } ${className}`}
      aria-current={isActive ? "page" : undefined}
    >
      {icon && <span className="mr-2 inline-block">{icon}</span>}
      {children}
    </button>
  );
};

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navTabs: NavTab[] = [
    { href: "/", label: "Home" },
    { href: "/bridalwear", label: "Bridal Wear" },
    { href: "/groomwear", label: "Groom Wear" },
    { href: "/gallery", label: "Gallery" },
    { href: "/offers", label: "Offers" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
  ];

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  // Determine Account button label based on pathname
  const accountLabel = pathname === "/login" ? "Register" : pathname === "/register" ? "Login" : "Account";
  const accountHref = pathname === "/login" ? "/register" : pathname === "/register" ? "/login" : "/login";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-6 py-4 md:px-8 flex items-center justify-between font-['Space_Grotesk',sans-serif]">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-teal-600 select-none">
        💍 Rajmahal Udaipur Rentals
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
        {navTabs.map(({ href, label }) => (
          <Link key={href} href={href}>
            <HeaderButton isActive={pathname === href}>{label}</HeaderButton>
          </Link>
        ))}
        <Link href={accountHref}>
          <HeaderButton icon={<MdSupervisorAccount />} isActive={pathname === "/login" || pathname === "/register"}>
            {accountLabel}
          </HeaderButton>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-gray-700 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-md"
        onClick={toggleMobileMenu}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col space-y-2 py-4 md:hidden transition-transform duration-300 ease-in-out transform-gpu">
          {navTabs.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={toggleMobileMenu}
              className="px-6 py-1"
            >
              <HeaderButton
                isActive={pathname === href}
                className="w-full text-left"
              >
                {label}
              </HeaderButton>
            </Link>
          ))}
          <Link href={accountHref} onClick={toggleMobileMenu} className="px-6 py-1">
            <HeaderButton
              isActive={pathname === "/login" || pathname === "/register"}
              className="w-full text-left"
              icon={<MdSupervisorAccount />}
            >
              {accountLabel}
            </HeaderButton>
          </Link>
        </div>
      )}
    </nav>
  );
}