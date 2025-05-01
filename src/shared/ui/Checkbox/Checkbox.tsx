import { FC, useState, useId } from "react";
import "./styles.scss";
import { Icon } from "../Icon";

interface ICheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  variant?: "checkbox-gray" | "checkbox-white";
}

export const Checkbox: FC<ICheckboxProps> = ({
  checked: propChecked = false,
  onChange,
  label = "Checkbox label",
  disabled = false,
  id: propId,
  variant = "checkbox-gray",
}) => {
  const generatedId = useId();
  const id = propId || generatedId;
  const [localChecked, setLocalChecked] = useState(propChecked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setLocalChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <div className={`checkbox-ui-container ${disabled ? "disabled" : ""}`}>
      <input
        type="checkbox"
        id={id}
        className="checkbox-ui-input"
        checked={localChecked}
        onChange={handleChange}
        disabled={disabled}
      />
      <label className="checkbox-ui-label" htmlFor={id}>
        <span className={`checkbox-ui-custom ${variant}`}>
          {localChecked && (
            <Icon
              name="check"
              size={13}
              color={variant === "checkbox-gray" ? "white" : "#F39100"}
            />
          )}
        </span>
        <span className="checkbox-ui-text">{label}</span>
      </label>
    </div>
  );
};
