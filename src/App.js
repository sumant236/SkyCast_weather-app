import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import SearchBar from "./Components/SearchBar/SearchBar";
import Forecast from "./Components/Forecast/Forecast";

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1 className="heading">How's the sky looking today?</h1>
      <SearchBar />
      <Forecast />
    </div>
  );
}

export default App;
