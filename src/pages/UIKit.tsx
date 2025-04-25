import { Button, Select, Input, InputTime, CalendarInput } from "@shared/ui";
import { FC, useState } from "react";

const options = [
  { label: "Option One", value: "1" },
  { label: "Option Two", value: "2" },
  { label: "Option Three", value: "3" },
];

export const UIKit: FC = () => {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [selectError, setSelectError] = useState(true);
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className="container">
      <div className="row-flex flex-d-col">
        <h1 className="text-32-bold">Заголовок 32px Bold</h1>
        <h2 className="text-24-bold">Подзаголовок 24px Bold</h2>
        <h3 className="text-18-semibold">Подзаголовок 18px SemiBold</h3>
        <p className="text-18-medium">Текст 18px Medium</p>
        <p className="text-16-semibold">Текст 16px SemiBold</p>
        <p className="text-16-regular">Основной текст 16px Regular</p>
        <small className="text-14-regular">Мелкий текст 14px Regular</small>
      </div>
      <div className="row-flex">
        <div className="col-flex">
          <h2>Button</h2>
          <Button variant="button-primary" iconLeftName={"plus"}>
            Войти
          </Button>
          <Button
            variant="button-primary"
            iconLeftName={"plus"}
            iconRightName={"plus"}
          >
            Войти
          </Button>
          <Button
            variant="button-secondary"
            iconLeftName={"plus"}
            iconRightName={"plus"}
          >
            Войти
          </Button>
          <Button variant="button-secondary" disabled>
            Войти
          </Button>
          <Button
            variant="button-small"
            iconLeftName={"plus"}
            iconRightName={"plus"}
          >
            Войти
          </Button>
          <Button variant="button-small" disabled>
            Войти
          </Button>
        </div>
        <div className="col-flex">
          <h2>Select</h2>
          <Select
            label="Title"
            description="Description"
            options={options}
            value={value}
            onChange={setValue}
            placeholder="Placeholder"
          />
          <Select
            label="Title"
            description="Description"
            options={options}
            value={value2}
            onChange={setValue2}
            placeholder="Placeholder"
            disabled
          />
          <Select
            label="Title"
            description="Description"
            options={options}
            value={value}
            onChange={setValue}
            placeholder="Placeholder"
            error={selectError}
          />
        </div>
        <div className="col-flex">
          <CalendarInput
            selectedDate={date}
            onChange={setDate}
            // minDate={new Date(2025, 0, 1)} // 1 января 2025
            // maxDate={new Date(2025, 11, 31)} // 31 декабря 2025
          />
          <CalendarInput selectedDate={date} onChange={setDate} error={true} />
        </div>
      </div>
      <div className="row-flex">
        <div className="col-flex">
          <h2>Input</h2>
          <Input
            type="text"
            label={"Название мероприятия"}
            placeholder="Enter text..."
          />
          <Input
            type="text"
            label={"Название мероприятия"}
            placeholder="Enter text..."
            error={true}
          />
          <Input
            type="text"
            label={"Название мероприятия"}
            placeholder="Enter text..."
            disabled={true}
          />
          <Input
            type="password"
            label={"Название мероприятия"}
            placeholder="Enter text..."
            // disabled={true}
          />
        </div>
        <div className="col-flex">
          <h2>InputTime</h2>
          <InputTime
            label="Время начала"
            onChange={(time) => console.log("Выбрано время:", time)}
          />
          <InputTime
            label="Время начала"
            value="00:00:00"
            onChange={(time) => console.log("Выбрано время:", time)}
            error={true}
          />
          <InputTime
            label="Время начала"
            value="00:00:00"
            onChange={(time) => console.log("Выбрано время:", time)}
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};
