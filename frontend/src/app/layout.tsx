import "../styles/globals.css";
import Navbar from "@/components/Header";

export const metadata = {
  title: "Rajmahal Udaipur",
  description: "Premium Wedding Outfit Rental Store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
