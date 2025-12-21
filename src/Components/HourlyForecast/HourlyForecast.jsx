import { useContext, useEffect, useRef, useState } from "react";
import CustomSelector from "../CustomUnitSelector/CustomSelector";
import styles from "./HourlyForecast.module.css";
import { ReactComponent as Dropdown } from "../../assets/images/icon-dropdown.svg";
import { ForecastContext } from "../../utils/ForecastContext";

const HourlyForecast = () => {
  const { hourlyForecast } = useContext(ForecastContext);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentDayName, setCurrentDayName] = useState();
  const [currentTime, setCurretTime] = useState();

  // Refs to manage internal scroll positioning
  const currentDayScrollRef = useRef();
  const scrollRef = useRef();

  const currentDay = new Date().getDay();
  const options = [
    {
      value: "Sunday",
      label: "Sunday",
    },
    {
      value: "Monday",
      label: "Monday",
    },
    {
      value: "Tuesday",
      label: "Tuesday",
    },
    {
      value: "Wednesday",
      label: "Wednesday",
    },
    {
      value: "Thursday",
      label: "Thursday",
    },
    {
      value: "Friday",
      label: "Friday",
    },
    {
      value: "Saturday",
      label: "Saturday",
    },
  ];

  // Rotate day list so the current day is first
  const reorderedOptions = [
    ...options.slice(currentDay),
    ...options.slice(0, currentDay),
  ];

  // Handle day selection change
  const handleChange = (category, day) => {
    setSelectedDay(day);
  };

  // Sync current time and initial selected day
  useEffect(() => {
    const date = new Date();
    const formattedTime = date
      .toLocaleString("default", {
        hour: "numeric",
        hour12: true,
      })
      .toUpperCase();

    console.log(formattedTime);
    setCurretTime(formattedTime);
    setCurrentDayName(options[date.getDay()].value);
    setSelectedDay(hourlyForecast.currentDay);
  }, [hourlyForecast]);

  // Auto-scroll to the current hour when viewing today
  useEffect(() => {
    if (
      selectedDay === currentDayName &&
      scrollRef.current &&
      currentDayScrollRef.current
    ) {
      // Calculate the distance from the top of the list to the current hour card
      const container = scrollRef.current;
      const activeCard = currentDayScrollRef.current;

      // offsetTop gives us exactly how many pixels down the card is
      const scrollPosition = activeCard.offsetTop;

      // Manually set the internal scroll position
      container.scrollTop = scrollPosition;
    } else if (scrollRef.current) {
      // Reset scroll for other days
      scrollRef.current.scrollTop = 0;
    }
  }, [selectedDay, currentDayName]);

  return hourlyForecast && selectedDay ? (
    <div className={styles.hourlyForecast}>
      <div className={styles.selectingOptions}>
        <p className={styles.title}>Hourly Forecast</p>

        {/* Toggle day selector dropdown */}
        <button onClick={() => setIsOpen(!isOpen)} className={styles.button}>
          {selectedDay}
          <Dropdown />
        </button>
        {isOpen && (
          <div className={styles.customSelector}>
            <CustomSelector
              options={reorderedOptions}
              selectedValue={selectedDay}
              handleChange={handleChange}
            />
          </div>
        )}
      </div>
      <div className={styles.hourlyContent}>
        {/* Scrollable hourly data container */}
        <div className={styles.hourlyWrapper} ref={scrollRef}>
          {hourlyForecast[selectedDay].map((data, index) => {
            const active =
              selectedDay === options[currentDay].value &&
              data.time === currentTime;
            return (
              <div
                className={styles.hourlyCard}
                key={index}
                // Attach ref only to the card matching current time
                ref={active ? currentDayScrollRef : null}
              >
                <img
                  src={data.iconSource}
                  alt="weatherIcon"
                  className={styles.weatherIcon}
                />
                <p>{data.time}</p>
                <p>{data.temp}&deg;</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <div>Loading....</div>
  );
};

export default HourlyForecast;
