"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import AboutUs from "@/components/AboutUs";
import ProductContainer from "@/components/ProductContainer";
import ProductInfoBox from "@/components/ProductInfoBox";
import HowWeWork from "@/components/HowWeWork";
import Footer from "@/components/Footer";
import ProductContainerResell from "@/components/ProductContainerResell";

export default function HomePage() {
  return (
    <div className="App">
      <Header />
      <Hero />

      {/* In Next.js, routing is file-based, 
          so "/" just renders this file */}
      <ProductContainer />

      {/* These would normally be their own pages,
          but since you had them inline, I kept them */}
      <ProductContainer isResell={true} />
      <HowWeWork />
      <AboutUs />
      <ProductInfoBox />
      <Clients />
      <Footer />
    </div>
  );
}
