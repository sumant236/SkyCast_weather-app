import styles from "./CustomSelector.module.css";
import { ReactComponent as Checkmark } from "../../assets/images/icon-checkmark.svg";

const CustomSelector = ({
  label,
  category,
  options,
  selectedValue,
  handleChange,
}) => {
  return (
    <div className={styles.customGroup}>
      {/* Optional label for unit categories */}
      {label && <h4 className={styles.groupLabel}>{label}</h4>}
      {options.map((option) => (
        <label
          key={option.value}
          // Apply active styling if the option is currently selected
          className={
            selectedValue === option.value
              ? styles.checkedOption
              : styles.uncheckedOption
          }
        >
          <input
            type="radio"
            name={category}
            value={option.value}
            checked={selectedValue === option.value}
            // Trigger parent change handler on click
            onChange={() => handleChange(category, option.value)}
            className={styles.selectorInput}
          />
          {option.label}
          {selectedValue === option.value && (
            <span className="checkmark">
              <Checkmark />
            </span>
          )}
        </label>
      ))}

      {category !== "percipitation" && <hr />}
    </div>
  );
};

export default CustomSelector;
