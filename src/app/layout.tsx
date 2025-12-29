import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// SEO / meta config
export const metadata: Metadata = {
  title: 'Kitchen Kraft Equipments - Commercial Kitchen Solutions',
  description: 'Leading manufacturer of commercial kitchen equipment in Pune. Custom design, manufacturing, and installation services.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Mobile Viewport Configuration */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
