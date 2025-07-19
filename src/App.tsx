// Import your components directly
import Header from './components/Header';
//import HeroSection from './components/HeroSection';
import NewHeroSection from './components/NewHeroSection';
import ImageCarousel from './components/ImageCarousel';
import AboutUsSection from './components/AboutUsSection';
import TestimonialsSection from './components/TestimonialsSection';
import FeaturesSection from './components/FeaturesSection';
import InventoryPage from './pages/InventoryPage';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';


function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-800 text-slate-800 dark:text-slate-200 font-sans antialiased">
      <Header />
      <main>
        {/* ✅ The components are now rendered in your preferred order, and NOTHING has been removed. */}
        <NewHeroSection />
        <ImageCarousel />
        <FeaturesSection />
        <InventoryPage />
        <AboutUsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
     <Footer />
     
    </div>
  );
}

export default App;