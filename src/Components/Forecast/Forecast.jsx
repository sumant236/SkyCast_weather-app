import CurrentForecast from "../CurrentForecast/CurrentForecast";
import DailyForecast from "../DailyForecast/DailyForecast";
import styles from "./Forecast.module.css";
import HourlyForecast from "../HourlyForecast/HourlyForecast";
import { useContext } from "react";
import { ForecastContext } from "../../utils/ForecastContext";
import loadingIcon from "../../assets/images/icon-loading.svg";

const Forecast = () => {
  const { hourlyForecast } = useContext(ForecastContext);
  return (
    /* Conditional rendering: Show dashboard if data exists, otherwise show loading spinner */
    hourlyForecast ? (
      <div className={styles.forecastContainer}>
        {/* Left side: Current conditions and 7-day outlook */}
        <div className={styles.dailyAndCurrent}>
          <CurrentForecast />
          <DailyForecast />
        </div>
        {/* Right side: Detailed hourly scrollable list */}{" "}
        <div className={styles.hourly}>
          <HourlyForecast />
        </div>
      </div>
    ) : (
      /* Centered loading state while fetching API data */
      <div>
        <img
          src={loadingIcon}
          alt="loading-icon"
          className={styles.loadingIcon}
        />
      </div>
    )
  );
};

export default Forecast;
