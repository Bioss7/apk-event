import { FC, useState, useRef, useEffect } from "react";
import "./styles.scss";

interface ISelectOption {
  label: string;
  value: string;
}

interface ISelectProps {
  options: ISelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  description?: string;
  error?: boolean;
  disabled?: boolean;
}

export const Select: FC<ISelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  label,
  description,
  error = false,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (val: string) => {
    onChange?.(val);
    setIsOpen(false);
    setSearch("");
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div
      className={`select-ui-container ${disabled ? "disabled" : ""} ${
        error ? "error" : ""
      }`}
      ref={containerRef}
    >
      <label className="select-ui-label" onClick={toggleDropdown}>
        {label}
      </label>

      <div
        className={`select-ui-input ${isOpen ? "open focused" : ""} ${
          value ? "filled" : ""
        }`}
        onClick={toggleDropdown}
      >
        {isOpen ? (
          <input
            ref={inputRef}
            className="select-ui-search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span>{selectedOption?.label || placeholder}</span>
        )}
      </div>

      {isOpen && (
        <div
          className="select-ui-dropdown"
          onClick={(e) => e.stopPropagation()}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <div
                key={opt.value}
                className={`select-ui-item ${
                  value === opt.value ? "selected" : ""
                }`}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </div>
            ))
          ) : (
            <div className="select-ui-item empty">Вариантов не найдено</div>
          )}
        </div>
      )}

      {description && <p className="select-ui-description">{description}</p>}
    </div>
  );
};
