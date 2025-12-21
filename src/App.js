import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import SearchBar from "./Components/SearchBar/SearchBar";
import Forecast from "./Components/Forecast/Forecast";
import { useContext } from "react";
import { ForecastContext } from "./utils/ForecastContext";
import ErrorPage from "./Components/ErrorPage/ErrorPage";

function App() {
  const {error} = useContext(ForecastContext);

  return (
    <div className="App">
      {/* Top navigation and settings */}
      <Navbar />

      {error ? (
        <ErrorPage />
      ) : (
        <>
          <h1 className="heading">How's the sky looking today?</h1>

          {/* Location search input */}
          <SearchBar />

          {/* Main weather dashboard container */}
          <Forecast />
        </>
      )}
    </div>
  );
}

export default App;
