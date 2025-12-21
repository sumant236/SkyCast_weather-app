import axios from "axios";
import searchIcon from "../../assets/images/icon-search.svg";
import styles from "./SearchBar.module.css";
import { useContext, useEffect, useState } from "react";
import { ReactComponent as LoadingIcon } from "../../assets/images/icon-loading.svg";
import { ForecastContext } from "../../utils/ForecastContext";
import { ReactComponent as ErrorIcon } from "../../assets/images/icon-error.svg";

const SearchBar = () => {
  const [geoLocations, setGeoLocations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { getForecast } = useContext(ForecastContext);

  // Search for locations using Open-Meteo Geocoding API
  function handleSearch() {
    setLoading(true);
    setIsOpen(true);
    axios(`https://geocoding-api.open-meteo.com/v1/search?name=${searchValue}`)
      .then((res) => {
        setErrorMessage(null);
        setGeoLocations(res.data.results);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // Update weather for the selected search result
  const handleClick = (location) => {
    getForecast(location.latitude, location.longitude);
    setIsOpen(false);
  };

  useEffect(() => {
    if (searchValue === "") {
      setIsOpen(false);
    } else {
      handleSearch();
    }

    // eslint-disable-next-line
  }, [searchValue]);

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <img
            src={searchIcon}
            alt="search-icon"
            className={styles.searchIcon}
          />
          <input
            placeholder="Search for a place..."
            className={styles.searchInput}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Show search result dropdown */}
      {geoLocations && isOpen && (
        <div className={styles.searchResults}>
          {loading ? (
            <div className={styles.loadingIcon}>
              <LoadingIcon />
            </div>
          ) : (
            geoLocations.map((location) => {
              let locationValues = [];
              // Extract City, State, and Country names
              for (let key in location) {
                if (
                  (key === "admin1" || key === "admin2") &&
                  !key.endsWith("_id")
                ) {
                  locationValues.unshift(location[key]);
                }
              }

              // Add the country at the end
              if (location.country) {
                locationValues.push(location.country);
              }

              const locationName = locationValues.join(", ");
              return (
                <div
                  className={styles.locationWrapper}
                  key={location.id}
                  onClick={() => handleClick(location)}
                >
                  <p className={styles.location}>{locationName}</p>
                </div>
              );
            })
          )}
        </div>
      )}

      {errorMessage && isOpen && (
        <div className={styles.searchResults}>
          <p className={styles.errorMessage}>
            <ErrorIcon />
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
