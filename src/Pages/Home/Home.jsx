import Hero from "./Hero";
import Collections from "./Collections";
import Trending from "./Trending";
import BestSeller from "./BestSeller";
import FiftyOff from "./FiftyOff";

function Home() {
  return (
    <main className="bg-gray-50 min-h-screen">

      <Hero />

      <Collections />

      <Trending />

      <BestSeller />

      <FiftyOff />

    </main>
  );
}

export default Home;