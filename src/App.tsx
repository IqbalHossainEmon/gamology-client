import "./App.css";
import FirstNavbar from "./Shared/FirstNavbar/FirstNavbar/FirstNavbar";
import useReloadScroll from "./Utils/Hooks/useReloadScroll";
import withAppsHOCs from "./Utils/HOC/withAppsHOCs";
import MainContent from "./Pages/MainContent/MainContent/MainContent";

function AppMain() {
  useReloadScroll();

  return (
    <>
      <FirstNavbar />
      <MainContent />
    </>
  );
}

const App = withAppsHOCs(AppMain);

export default App;
