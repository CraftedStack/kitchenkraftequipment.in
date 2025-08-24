import "./globals.css";
import type { Metadata } from "next";

// SEO / meta config
export const metadata: Metadata = {
  title: "KITCHEN KRAFT EQUIPMENTS",
  description: "Premium kitchen equipment and solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
