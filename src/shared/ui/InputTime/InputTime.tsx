import { FC, useState, useEffect, useRef, useId } from "react";
import "./styles.scss";

interface IInputTimeProps {
  label?: string;
  value?: string;
  onChange?: (time: string) => void;
  disabled?: boolean;
  error?: boolean;
  description?: string;
  id?: string;
}

export const InputTime: FC<IInputTimeProps> = ({
  label = "Время начала",
  value = "",
  onChange,
  disabled = false,
  error = false,
  description = "Описание",
  id: propId,
}) => {
  const generatedId = useId();
  const id = propId || generatedId;
  const [time, setTime] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTime(value);
  }, [value]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newTime = e.target.value.replace(/[^0-9]/g, "");

    if (newTime.length > 0) {
      newTime =
        newTime.slice(0, 2) +
        (newTime.length > 2 ? ":" + newTime.slice(2, 4) : "") +
        (newTime.length > 4 ? ":" + newTime.slice(4, 6) : "");
    }

    setTime(newTime);
    if (newTime.length === 8) onChange?.(newTime);
  };

  const handleBlur = () => {
    if (!time) return;

    const parts = time.split(":");
    const formattedTime = [
      parts[0]?.padStart(2, "0") || "00",
      parts[1]?.padStart(2, "0") || "00",
      parts[2]?.padStart(2, "0") || "00",
    ].join(":");

    setTime(formattedTime);
    onChange?.(formattedTime);
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

      <input
        className="input-ui-field"
        id={id}
        ref={inputRef}
        type="text"
        value={time}
        onChange={handleTimeChange}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder="00:00:00"
        maxLength={8}
        onKeyDown={(e) => {
          if (!/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight/.test(e.key)) {
            e.preventDefault();
          }
        }}
      />

      {error && <p className="input-ui-description">{description}</p>}
    </div>
  );
};
