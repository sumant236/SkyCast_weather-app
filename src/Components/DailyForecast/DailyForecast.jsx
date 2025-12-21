import { useContext } from "react";
import styles from "./DailyForecast.module.css";
import { ForecastContext } from "../../utils/ForecastContext";

const DailyForecast = () => {
  const { dailyForecast } = useContext(ForecastContext);
  return (
    <div className={styles.dailyForecast}>
      <p className={styles.heading}>Daily Forecast</p>
      
      {/* Container for the 7-day forecast list */}
      <div className={styles.dailyCards}>
        {dailyForecast &&
          dailyForecast.map((data, index) => (
            <div className={styles.card} key={index}>

              {/* Show only the first three letters of the day (e.g., "Mon") */}
              <p className={styles.cardTitle}>{data.day.substring(0, 3)}</p>
              <img
                src={data.iconSource}
                alt="weather-icon"
                className={styles.weatherIcon}
              />

              {/* Display high and low temperatures */}
              <div className={styles.minMaxDisplay}>
                <p className={styles.maxTemp}>
                  {Math.round(data.maxTemp)}&deg;
                </p>
                <p className={styles.minTemp}>
                  {Math.round(data.minTemp)}&deg;
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DailyForecast;
