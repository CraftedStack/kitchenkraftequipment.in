import "./globals.css";
import type { Metadata } from "next";

// SEO / meta config
export const metadata: Metadata = {
  title: "Kitchen Equipment Manufacturers in Pune | Kitchen Kraft Equipments",
  description:
    "Kitchen Kraft Equipments - Leading manufacturers of commercial kitchen equipment in Pune. We provide high-quality stainless steel kitchen equipment for hotels, restaurants, and food businesses.",
  verification: {
    google: "x2qUlZkazdravZsndVB3cJTU5ljfQ4kYHfXSmyfY7zU", // your code
  },
    keywords: [
    "kitchen equipment",
    "kitchen equipment manufacturers",
    "commercial kitchen equipment",
    "kitchen equipment manufacturers Pune",
    "commercial kitchen equipment Pune",
    "hotel kitchen equipment Pune",
    "Kitchen Kraft",
  ],
  openGraph: {
    title: "Kitchen Equipment Manufacturers in Pune | Kitchen Kraft Equipments",
    description:
      "Commercial kitchen equipment manufacturers in Pune. Kitchen Kraft provides durable and custom stainless steel kitchen solutions for hotels, restaurants, and more.",
    url: "https://kitchenkraftequipments.com/",
    siteName: "Kitchen Kraft Equipments",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
