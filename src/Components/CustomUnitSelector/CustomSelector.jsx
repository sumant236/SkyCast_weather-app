import styles from "./CustomSelector.module.css";
import { ReactComponent as Checkmark } from "../../assets/images/icon-checkmark.svg";

const CustomSelector = ({
  label,
  category,
  options,
  selectedValue,
  handleChange,
}) => {
  console.log(selectedValue);
  return (
    <div className={styles.unitGroup}>
      {label && <h4 className={styles.groupLabel}>{label}</h4>}
      {options.map((option) => (
        <label
          key={option.value}
          className={
            selectedValue === option.value
              ? styles.checkedUnitOption
              : styles.uncheckedUnitOption
          }
        >
          <input
            type="radio"
            name={category}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleChange(category, option.value)}
            className={styles.unitSelectorInput}
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
