import Navbar from '@/components/Navbar';
import GiveawayBanner from '@/components/GiveawayBanner';
import SearchBar from '@/components/SearchBar';
import StateBar from '@/components/StateBar';
import ResultsList from '@/components/ResultsList';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <GiveawayBanner />
        <SearchBar />
        <StateBar />
        <ResultsList />
      </main>
      <Footer />
    </div>
  );
}
