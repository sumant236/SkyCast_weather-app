import errorLogo from "../../assets/images/icon-error.svg";
import styles from "./ErrorPage.module.css";
import { ReactComponent as RetryLogo } from "../../assets/images/icon-retry.svg";
import { useContext } from "react";
import { ForecastContext } from "../../utils/ForecastContext";

const ErrorPage = () => {
  const { getGeoLocation } = useContext(ForecastContext);
  return (
    <div className={styles.errorContainer}>
      <img src={errorLogo} alt="error-logo" className={styles.errorLogo} />
      <h1 className={styles.errorTitle}>Something went wrong</h1>
      <p className={styles.errorDesc}>
        We couldn't connect to the server (API error). Please try again in a few
        moments.
      </p>
      {/* Button to manually re-trigger the data fetch process */}
      <button onClick={() => getGeoLocation()} className={styles.retryButton}>
        <RetryLogo />
        Retry
      </button>
    </div>
  );
};

export default ErrorPage;
