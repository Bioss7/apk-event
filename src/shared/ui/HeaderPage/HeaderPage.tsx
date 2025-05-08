import { FC, useState } from "react";
import { Button, Select, CalendarInput } from "@shared/ui";
import "./styles.scss";

interface IHeaderPage {
  title: string;
  onClick?: () => void;
  showButton?: boolean;
  showSelect?: boolean;
  showCalendarInput?: boolean;
}

const options = [
  { label: "Option One", value: "1" },
  { label: "Option Two", value: "2" },
  { label: "Option Three", value: "3" },
];

export const HeaderPage: FC<IHeaderPage> = ({
  title,
  onClick,
  showButton = true,
  showSelect = false,
  showCalendarInput = false,
}) => {
  const [value, setValue] = useState("");

  const headerClasses = [
    "header-page",
    showButton ? "header-page--button" : "",
    showSelect || showCalendarInput ? "header-page--input" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={headerClasses}>
      <h1 className="text-32-bold">{title}</h1>
      {showButton && (
        <Button
          variant="button-primary"
          iconLeftName={"plus"}
          onClick={onClick}
        >
          Добавить
        </Button>
      )}
      {(showSelect || showCalendarInput) && (
        <div className="header-page__wrapper">
          {showSelect && (
            <Select
              options={options}
              value={value}
              onChange={setValue}
              placeholder="Placeholder"
            />
          )}
          {showCalendarInput && <CalendarInput />}
        </div>
      )}
    </div>
  );
};
