import "./App.css";
import StatsTable from "./components/WineStats";
import { WineData } from "./data/data";

function App() {
  return (
    <div className="App">
      <h1>Wine Statistics</h1>
      <div>
        {/* For Flavanoids */}
        <StatsTable data={WineData} property="Flavanoids" />

        {/* For Gamma */}
        <StatsTable data={WineData} property="Gamma" />
      </div>
    </div>
  );
}

export default App;
