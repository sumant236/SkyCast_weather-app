import axios from "axios";
import { WeatherIconMap } from "./weatherIconMap";
import weatherCodeList from "./weatherCodeList.json";
import { createContext, useState, useEffect } from "react";

export const ForecastContext = createContext({
  currentForecast: [],
  dailyForecast: [],
  hourlyForecast: [],
  longitude: [],
  latitude: [],
  selectedUnits: {},
  error: "",
  handleUnitChange: () => {},
  getForecast: () => {},
  getGeoLocation: () => {},
});

export const ForecastProvider = ({ children }) => {
  const [currentForecast, setCurrentForecast] = useState(null);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [longitude, setLogitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [error, setError] = useState(null);

  // State for user-selectable units; changes here trigger a re-fetch of the API
  const [selectedUnits, setSelectedUnits] = useState({
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm",
  });

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Format and store current hour weather
  const addCurrentForecast = (data) => {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();

    // Rounding time to the nearest hour to match the API's hourly dataset
    const currentTimeString =
      date.getMinutes() > 30
        ? `${year}-${month}-${day}T${hours + 1}:00`
        : `${year}-${month}-${day}T${hours}:00`;

    const indexOfCurrentTime = data.hourly.time.indexOf(currentTimeString);

    // Combine raw values with unit strings (e.g., "20" + "°C") for UI display
    const temperature = Math.round(
      data.hourly.temperature_2m[indexOfCurrentTime]
    );
    const feelsLike =
      Math.round(data.current.apparent_temperature) +
      data.current_units.apparent_temperature;
    const humidity =
      data.current.relative_humidity_2m +
      data.current_units.relative_humidity_2m;
    const windSpeed =
      data.current.wind_speed_10m + data.current_units.wind_speed_10m;
    const precipitation =
      data.current.precipitation + data.current_units.precipitation;
    const weatherCode = data.hourly.weather_code[indexOfCurrentTime];
    const weather = weatherCodeList[weatherCode];

    setCurrentForecast({
      temperature,
      feelsLike,
      humidity,
      windSpeed,
      precipitation,
      iconSource: WeatherIconMap[weather.iconLocation],
    });
  };

  const addDailyForecast = (data) => {
    const daily = data.daily;
    const newForecasts = [];

    // Format and store 7-day forecast
    for (let i = 0; i < 7; i++) {
      const date = new Date(daily.time[i]);
      const day = days[date.getDay()];
      const maxTemp = daily.temperature_2m_max[i];
      const minTemp = daily.temperature_2m_min[i];
      const weather = weatherCodeList[daily.weather_code[i]];

      newForecasts.push({
        day,
        maxTemp,
        minTemp,
        iconSource: WeatherIconMap[weather.iconLocation],
      });
    }

    setDailyForecast(newForecasts);
  };

  // Group hourly data by day names
  const addHourlyForecast = (data) => {
    const hourlyData = data.hourly;
    const newHourlyForecast = { currentDay: days[new Date().getDay()] };

    for (let i = 0; i < hourlyData.time.length; i++) {
      const date = new Date(hourlyData.time[i]);
      const formattedTime = date
        .toLocaleString("default", {
          hour: "numeric",
          hour12: true,
        })
        .toUpperCase();
      const day = days[date.getDay()];
      const weather = weatherCodeList[hourlyData.weather_code[i]];
      const temp = hourlyData.temperature_2m[i];

      const hourlyItem = {
        time: formattedTime,
        temp: Math.round(temp),
        iconSource: WeatherIconMap[weather.iconLocation],
      };

      if (!newHourlyForecast[day]) {
        newHourlyForecast[day] = [];
      }
      newHourlyForecast[day].push(hourlyItem);
    }

    setHourlyForecast(newHourlyForecast);
  };

  // Fetch weather data from Open-Meteo
  const getForecast = (latitude, longitude) => {
    // Prevent calling API if we don't have coords
    if (!latitude || !longitude) {
      setError(
        "We couldn't determine your location. Please ensure your device's Location Services are turned on and that you've granted browser permission. Alternatively, you can search for a city manually above."
      );
      return;
    }

    setLatitude(latitude);
    setLogitude(longitude);

    // Fetching data with dynamic unit parameters based on user settings
    axios(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code&current=wind_speed_10m,relative_humidity_2m,apparent_temperature,precipitation&timezone=auto&wind_speed_unit=${selectedUnits.windSpeed}&temperature_unit=${selectedUnits.temperature}&precipitation_unit=${selectedUnits.precipitation}`
    )
      .then((res) => {
        setError(null);
        addCurrentForecast(res.data);
        addDailyForecast(res.data);
        addHourlyForecast(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch weather data. Please try again later.");
      });
  };

  // Update global unit settings
  const handleUnitChange = (category, newValue) => {
    setSelectedUnits((prevUnits) => ({
      ...prevUnits,
      [category]: newValue,
    }));
  };

  // Fetch user location via browser API
  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setError(null);
          getForecast(latitude, longitude);
        },
        (error) => {
          setError(
            "We couldn't determine your location. Please ensure your device's Location Services are turned on and that you've granted browser permission. Alternatively, you can search for a city manually above."
          );
          console.error("Error getting user location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000, // Wait for 5 seconds, then trigger the error callback
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Get location on initial mount
  useEffect(() => {
    getGeoLocation();

    // eslint-disable-next-line
  }, []);

  // Re-fetch weather when units change
  useEffect(() => {
    getForecast(latitude, longitude);

    // eslint-disable-next-line
  }, [selectedUnits]);

  return (
    <ForecastContext.Provider
      value={{
        longitude,
        latitude,
        currentForecast,
        dailyForecast,
        hourlyForecast,
        selectedUnits,
        error,
        getForecast,
        handleUnitChange,
        getGeoLocation,
      }}
    >
      {children}
    </ForecastContext.Provider>
  );
};
