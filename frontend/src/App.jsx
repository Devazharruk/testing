import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [data, setData] = useState([]); // Ensure data is initialized as an array

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/data", {
        method: "GET",
      });
      if (response.ok) {
        const result = await response.json();
        // Ensure the result is an array before setting it
        if (Array.isArray(result)) {
          setData(result);
        } else {
          console.error("Fetched data is not an array");
          setData([]); // Set an empty array in case of error
        }
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <button onClick={fetchData}>Fetch Data</button>
      <div className="data">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item, index) => (
            <h1 key={index}>{item.message}</h1> // Replace 'propertyName' with the actual property you want to display
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}

export default App;
