import { FC, useState, useRef, useEffect, useId, useCallback } from "react";
import DatePicker from "react-datepicker";
import { format, isWeekend } from "date-fns";
import { ru } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { Icon } from "../Icon";
import "./styles.scss";

interface ICalendarInputProps {
  selectedDate?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  label?: string;
  description?: string;
  error?: boolean;
  disabled?: boolean;
  minDate?: Date | null;
  maxDate?: Date | null;
  id?: string;
}

export const CalendarInput: FC<ICalendarInputProps> = ({
  selectedDate = null,
  onChange,
  placeholder = "Выберите дату",
  label = "Дата",
  description = "Выберите нужную дату",
  error = false,
  disabled = false,
  minDate = null,
  maxDate = null,
  id: propId,
}) => {
  const generatedId = useId();
  const id = propId || generatedId;
  const [date, setDate] = useState<Date | null>(selectedDate);
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleChange = useCallback(
    (date: Date | null) => {
      setDate(date);
      onChange?.(date);
      setIsOpen(false);
    },
    [onChange]
  );

  const formatDisplayDate = useCallback((date: Date | null) => {
    if (!date) return "";
    return format(date, "dd.MM.yyyy");
  }, []);

  return (
    <div
      className={`input-ui-container ${disabled ? "disabled" : ""} ${
        error ? "error" : ""
      }`}
      ref={calendarRef}
    >
      <label className="input-ui-label" htmlFor={id}>
        {label}
      </label>

      <div className="input-ui-field-wrapper">
        <input
          id={id}
          type="text"
          readOnly
          value={formatDisplayDate(date)}
          placeholder={placeholder}
          disabled={disabled}
          className="input-ui-field"
          onClick={() => !disabled && setIsOpen(!isOpen)}
        />
        <Icon name="calendar" className="input-ui-icon" />
      </div>

      {isOpen && (
        <div className="calendar-dropdown">
          <DatePicker
            selected={date}
            onChange={handleChange}
            inline
            disabled={disabled}
            calendarClassName="custom-calendar"
            locale={ru}
            minDate={minDate}
            maxDate={maxDate}
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="calendar-header">
                <button
                  type="button"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled || disabled}
                  className="calendar-nav-button prev"
                  aria-label="Previous Month"
                >
                  <Icon name="arrow-left" />
                </button>
                <div className="calendar-month-title">
                  {format(date, "LLLL, yyyy", { locale: ru })}
                </div>
                <button
                  type="button"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled || disabled}
                  className="calendar-nav-button next"
                  aria-label="Next Month"
                >
                  <Icon name="arrow-right" />
                </button>
              </div>
            )}
            dayClassName={(date) => {
              const weekend = isWeekend(date);
              const isSelected =
                date.toDateString() === selectedDate?.toDateString();

              let className = "";
              if (weekend) className += " weekend";
              if (isSelected) className += " selected";
              if (date.getMonth() !== selectedDate?.getMonth())
                className += " outside-month";

              return className.trim();
            }}
          />
        </div>
      )}

      {error && <p className="input-ui-description">{description}</p>}
    </div>
  );
};
