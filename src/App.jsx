/* eslint-disable react/prop-types */
import { useState } from 'react';
import './App.css';

function Card({ title, body, sign }) {
  return (
    <div className='card'>
      <h3>{title}</h3>
      <h4>{body}{sign}</h4>
    </div>
  );
}

function App() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async (cityName) => {
    try {
      setLoading(true); // Start loading
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=cff444a355b34e978fe81403243003&q=${cityName}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const finalData = await response.json();
  
      setWeatherData(finalData);
      setLoading(false); // End loading
    } catch (error) {
      alert("Failed to fetch weather data");
      setLoading(false); // End loading
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cityName) {
      fetchReport(cityName);
    }
  };

  return (
    <div className='weatherApp'>
      <div className='searchSection'>
        <form onSubmit={handleSubmit}>
          <input 
            type='text' 
            placeholder='Enter city name'
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <button type='submit'>Search</button>
        </form>
      </div>
      {loading ? (
        <h4 className='loading'>Loading Data...</h4>
      ) : (
        weatherData && (
          <div className='data'>
            <Card title="Temperature" body={weatherData.current.temp_c} sign="°C" />
            <Card title="Humidity" body={weatherData.current.humidity} sign="%" />
            <Card title="Condition" body={weatherData.current.condition.text} />
            <Card title="Wind Speed" body={weatherData.current.wind_kph} sign=" kph" />
          </div>
        )
      )}
    </div>
  );
}

export default App;
