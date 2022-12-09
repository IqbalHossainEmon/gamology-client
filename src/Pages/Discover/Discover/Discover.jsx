import Banner from '../Components/Banner/Banner/Banner';
import EventGames from '../Components/EventGames/EventGames/EventGames';
import FreeGames from '../Components/FreeGames/FreeGames/FreeGames';
import Games from '../Components/Games/Games/Games';

export default function Discover() {
  return (
    <>
      <Banner />
      <Games />
      <FreeGames />
      <EventGames />
    </>
  );
}
