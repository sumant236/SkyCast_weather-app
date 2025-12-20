import CurrentForecast from "../CurrentForecast/CurrentForecast";
import DailyForecast from "../DailyForecast/DailyForecast";
import styles from "./Forecast.module.css";
import HourlyForecast from "../HourlyForecast/HourlyForecast";

const Forecast = () => {
  return (
    <div className={styles.forecastContainer}>
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
