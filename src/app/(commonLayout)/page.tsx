import FeatureHighlights from "@/components/Home/FeatureHighlights";
import Hero from "@/components/Home/Hero";
import Social from "@/components/Home/Social";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Social />
      <FeatureHighlights />
      <Footer />
    </>
  );
}
