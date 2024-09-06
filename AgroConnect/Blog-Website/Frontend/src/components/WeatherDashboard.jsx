import React, { useState, useEffect } from "react";

const WeatherDashboard = ({ pincode }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [showForecast, setShowForecast] = useState(false); // State to toggle forecast visibility
  const [error, setError] = useState(null);

  const apiKey = "6dd2d270960a396a8c78f2d23f8b8041"; // OpenWeatherMap API Key
  const countryCode = "IN"; // Default country code (India)

  useEffect(() => {
    // Fetch weather data using zip code
    if (pincode) {
      fetchWeather(pincode);
      fetchForecast(pincode);
    }
  }, [pincode]);

  const fetchWeather = async (zip) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${countryCode}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchForecast = async (zip) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?zip=${zip},${countryCode}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error(`Failed to fetch forecast data: ${response.statusText}`);
      const data = await response.json();
      const dailyForecast = data.list.filter((reading) =>
        reading.dt_txt.includes("12:00:00")
      );
      setForecast(dailyForecast);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleForecast = () => {
    setShowForecast(!showForecast);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (error) return <div className="p-4 text-red-600 text-center">Error: {error}</div>;
  if (!weather) return <div className="p-4 text-gray-600 text-center">Loading...</div>;

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      {/* Current Weather Section */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-lg mb-4">
        <h2 className="text-2xl font-bold mb-1">{weather.name} Weather</h2>
        <p className="text-lg mb-2">{formatDate(new Date().toISOString())}</p>
        <div className="flex items-center justify-center space-x-4">
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt="Weather Icon"
              className="w-16"
            />
          </div>
          <div>
            <p className="text-2xl font-semibold">{weather.main.temp}°C</p>
            <p className="text-sm">{weather.weather[0].description}</p>
          </div>
        </div>
      </div>

      {/* Button to Toggle Forecast */}
      <div className="mb-4 flex justify-center">
        <button
          onClick={toggleForecast}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        >
          {showForecast ? "Hide 5-Day Forecast" : "Show 5-Day Forecast"}
        </button>
      </div>

      {/* 5-Day Forecast Section */}
      {showForecast && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {forecast.map((day, index) => (
            <div
              key={index}
              className="bg-white text-center p-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <p className="font-semibold text-xs mb-1">
                {formatDate(day.dt_txt)}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt="Weather Icon"
                className="w-10 mx-auto mb-1"
              />
              <p className="text-sm font-semibold">{day.main.temp}°C</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;