import CurrentForecast from "../CurrentForecast/CurrentForecast";
import DailyForecast from "../DailyForecast/DailyForecast";
import styles from "./Forecast.module.css";
import HourlyForecast from "../HourlyForecast/HourlyForecast";

const Forecast = () => {
  return (
    /* Main dashboard layout: Groups Current/Daily forecasts on the left and Hourly on the right */
     <div
      className={styles.forecastContainer}
    >
      <div className={styles.dailyAndCurrent}>
        <CurrentForecast />
        <DailyForecast />
      </div>
      <div className={styles.hourly}>
        <HourlyForecast />
      </div>
    </div>
  );
};

export default Forecast;
