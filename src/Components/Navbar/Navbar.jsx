import { useContext, useState } from "react";
import logo from "../../assets/images/logo.svg";
import { ReactComponent as DropDown } from "../../assets/images/icon-dropdown.svg";
import { ReactComponent as Units } from "../../assets/images/icon-units.svg";
import styles from "./Navbar.module.css";
import CustomSelector from "../CustomUnitSelector/CustomSelector";
import { ForecastContext } from "../../utils/ForecastContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { handleUnitChange, selectedUnits } = useContext(ForecastContext);

  const unitData = [
    {
      label: "Temperature",
      category: "temperature",
      options: [
        { value: "celsius", label: "Celsius (°C)" },
        { value: "fahrenheit", label: "Fahrenheit (°F)" },
      ],
    },
    {
      label: "Wind Speed",
      category: "windSpeed",
      options: [
        { value: "kmh", label: "km/h" },
        { value: "mph", label: "mph" },
      ],
    },
    {
      label: "Precipitation",
      category: "precipitation",
      options: [
        { value: "mm", label: "Millimeters (mm)" },
        { value: "inch", label: "Inches (in)" },
      ],
    },
  ];

  return (
    <div className={styles.header}>
      <img src={logo} alt="logo" className={styles.logo} />
      <div className={styles.customDropdownContainer}>
        <button
          className={styles.unitsToggleButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="icon">
            <Units />
          </span>
          Units
          <span className="arrow">
            <DropDown />
          </span>
        </button>

        {isOpen && (
          <div className={styles.unitsPanel}>
            {unitData.map((group) => (
              <CustomSelector
                key={group.category}
                label={group.label}
                category={group.category}
                options={group.options}
                selectedValue={selectedUnits[group.category]}
                handleChange={handleUnitChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
