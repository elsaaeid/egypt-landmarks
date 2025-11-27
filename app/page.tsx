import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
// import KrpanoTour from "@/components/KrpanoTour";
import HeroSection from "@/components/HeroSection";
import AboutEgypt from "@/components/AboutEgypt";
import HistorySection from "@/components/HistorySection";
import Gallery from "@/components/Gallery";
import FeaturedLandmarks from "@/components/FeaturedLandmarks";


export default function Home() {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <Navbar />
      <HeroSection />
      <AboutEgypt />
      <HistorySection />
      <FeaturedLandmarks />
      <Gallery />
      <Footer />
    </div>
  );
}
