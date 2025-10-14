import "../styles/globals.css";
import Navbar from "@/components/Header";
import { Space_Grotesk } from "next/font/google";

export const metadata = {
  title: "Rajmahal Udaipur",
  description: "Premium Wedding Outfit Rental Store",
};
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={` ${spaceGrotesk.className} font-family: 'Space Grotesk', sans-serif;`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
