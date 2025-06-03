import Hero from './components/Hero';
import Tokenomics from './components/Tokenomics';
import BuySection from './components/BuySection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-dark text-white min-h-screen font-sans">
      <Hero />
      <Tokenomics />
      <BuySection />
      <Footer />
    </div>
  );
}

export default App;
