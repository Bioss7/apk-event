import { FC, useState, useRef, useEffect, useId } from "react";
import { Icon } from "../Icon";
import "./styles.scss";

interface IInputProps {
  type?: "text" | "time" | "password";
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  description?: string;
  error?: boolean;
  disabled?: boolean;
  id?: string;
}

export const Input: FC<IInputProps> = ({
  type = "text",
  value: propValue,
  onChange,
  placeholder = "",
  label = "Title",
  description = "Description",
  error = false,
  disabled = false,
  id: propId,
}) => {
  const generatedId = useId();
  const id = propId || generatedId;
  const [localValue, setLocalValue] = useState(propValue || "");
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalValue(propValue || "");
  }, [propValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div
      className={`input-ui-container ${disabled ? "disabled" : ""} ${
        error ? "error" : ""
      }`}
    >
      <label className="input-ui-label" htmlFor={id}>
        {label}
      </label>

      <div className="input-ui-field-wrapper">
        <input
          className="input-ui-field"
          id={id}
          ref={inputRef}
          type={type === "password" && showPassword ? "text" : type}
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
        />

        {type === "password" && (
          <button
            type="button"
            className="input-ui-password-toggle"
            onClick={togglePasswordVisibility}
            disabled={disabled}
          >
            <Icon
              name={showPassword ? "eye-open" : "eye-closed"}
              size={20}
              color={localValue ? "#333333" : "#cccccc"}
            />
          </button>
        )}
      </div>
      {error && <p className="input-ui-description">{description}</p>}
    </div>
  );
};
