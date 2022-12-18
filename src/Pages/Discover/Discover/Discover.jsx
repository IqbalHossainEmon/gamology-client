import Banner from '../Components/Banner/Banner/Banner';
import EventGames from '../Components/EventGames/EventGames/EventGames';
import ExploreGames from '../Components/ExploreGames/ExploreGames';
import FreeGames from '../Components/FreeGames/FreeGames/FreeGames';
import Games from '../Components/Games/Games/Games';
import Navbar from '../Components/Navbar/Navbar';

export default function Discover() {
  return (
    <>
      <Navbar />
      <Banner />
      <Games />
      <FreeGames />
      <EventGames />
      <ExploreGames />
    </>
  );
}
