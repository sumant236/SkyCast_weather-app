import React, { useContext, useEffect, useState } from "react";
import styles from "./CurrentForecast.module.css";
import axios from "axios";
import { ForecastContext } from "../../utils/ForecastContext";

const CurrentForecast = () => {
  // Access global weather data and coordinates of the user
  const { currentForecast, longitude, latitude } = useContext(ForecastContext);
  const [location, setLocation] = useState("");
  const [currentDate, setCurrentDate] = useState(null);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Fetch city and state names from coordinates
  useEffect(() => {
    // Reverse Geocoding: Converts lat/lng into readable city and state names
    if (longitude && latitude) {
      axios(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&location_type=ROOFTOP&result_type=street_address&key=${process.env.REACT_APP_GEOCODING_API}`
      )
        .then((res) => {
          console.log(res.data);
          const components = res.data?.results?.[0]?.address_components || [];
          let locality = null;
          let state = null;

          // Extract locality and state from Google API response
          for (let component of components) {
            if (component.types.includes("locality")) {
              locality = component.long_name;
            } else if (
              component.types.includes("administrative_area_level_1")
            ) {
              state = component.long_name;
            }
          }
          setLocation(locality + ", " + state);

          // Format current date for display
          const date = new Date();
          const year = date.getFullYear();
          const day = date.getDate();
          const dayName = days[date.getDay()];
          const monthName = date.toLocaleString("default", { month: "short" });

          setCurrentDate(`${dayName}, ${monthName} ${day}, ${year}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, [longitude, latitude, currentForecast]);

  return (
    <div className={styles.currentForecast}>
      {/* Render weather data once available */}
      {currentForecast && (
        <div className={styles.currentForecastContainer}>
          {/* Main temperature and location card */}
          <div className={styles.tempCard}>
            <div className={styles.locationGroup}>
              <h2 className={styles.location}>{location}</h2>
              <p className={styles.currentDate}>{currentDate}</p>
            </div>
            <div className={styles.tempDisplay}>
              <img
                src={currentForecast.iconSource}
                alt="weather-icon"
                className={styles.weatherIcon}
              />
              <h1 className={styles.currentTemp}>
                {currentForecast.temperature} &deg;
              </h1>
            </div>
          </div>

          {/* Display weather detail cards */}
          <div className={styles.weatherCards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>Feels Like</p>
              <p className={styles.cardValue}>{currentForecast.feelsLike}</p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>Humidity</p>
              <p className={styles.cardValue}>{currentForecast.humidity}</p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>Wind</p>
              <p className={styles.cardValue}>{currentForecast.windSpeed}</p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>Precipitation</p>
              <p className={styles.cardValue}>
                {currentForecast.precipitation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentForecast;
