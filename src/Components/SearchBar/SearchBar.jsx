import axios from "axios";
import searchIcon from "../../assets/images/icon-search.svg";
import styles from "./SearchBar.module.css";
import { useContext, useState } from "react";
import { ReactComponent as LoadingIcon } from "../../assets/images/icon-loading.svg";
import { ForecastContext } from "../../utils/ForecastContext";

const SearchBar = () => {
  const [geoLocations, setGeoLocations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { getForecast } = useContext(ForecastContext);

  // Search for locations using Open-Meteo Geocoding API
  function handleSearch(e) {
    setLoading(true);
    axios(
      `https://geocoding-api.open-meteo.com/v1/search?name=${e.target.value}`
    )
      .then((res) => {
        setGeoLocations(res.data.results);
        setIsOpen(true);
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
            onChange={handleSearch}
          />
        </div>
        <button className={styles.searchButton}>Search</button>
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
              console.log(location);
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
    </div>
  );
};

export default SearchBar;
