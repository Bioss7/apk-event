import { HeaderPage, ScheduleTable } from "@shared/ui";
import { FC } from "react";

const scheduleData = [
  {
    id: "1",
    object: "Мой компьютер",
    days: {
      "17.03.2025": false,
      "18.03.2025": false,
      "19.03.2025": false,
      "20.03.2025": false,
      "21.03.2025": false,
      "22.03.2025": false,
      "23.03.2025": false,
    },
  },
  {
    id: "2",
    object: "Влад",
    days: {
      "17.03.2025": false,
      "18.03.2025": false,
      "19.03.2025": false,
      "20.03.2025": false,
      "21.03.2025": false,
      "22.03.2025": false,
      "23.03.2025": false,
    },
  },
  {
    id: "3",
    object: "Сервер ADM-PPS",
    days: {
      "17.03.2025": false,
      "18.03.2025": false,
      "19.03.2025": false,
      "20.03.2025": false,
      "21.03.2025": false,
      "22.03.2025": false,
      "23.03.2025": false,
    },
  },
  {
    id: "4",
    object: "Цирк зеленый",
    days: {
      "17.03.2025": false,
      "18.03.2025": false,
      "19.03.2025": false,
      "20.03.2025": false,
      "21.03.2025": false,
      "22.03.2025": false,
      "23.03.2025": false,
    },
  },
  {
    id: "5",
    object: "Цирк белый",
    days: {
      "17.03.2025": false,
      "18.03.2025": false,
      "19.03.2025": false,
      "20.03.2025": false,
      "21.03.2025": false,
      "22.03.2025": false,
      "23.03.2025": false,
    },
  },
  {
    id: "6",
    object: "Арена левая",
    days: {
      "17.03.2025": false,
      "18.03.2025": false,
      "19.03.2025": false,
      "20.03.2025": false,
      "21.03.2025": false,
      "22.03.2025": false,
      "23.03.2025": false,
    },
  },
  {
    id: "7",
    object: "Арена правая",
    days: {
      "17.03.2025": false,
      "18.03.2025": false,
      "19.03.2025": false,
      "20.03.2025": false,
      "21.03.2025": false,
      "22.03.2025": false,
      "23.03.2025": false,
    },
  },
  {
    id: "8",
    object: "Ручная касса",
    days: {
      "17.03.2025": false,
      "18.03.2025": false,
      "19.03.2025": false,
      "20.03.2025": false,
      "21.03.2025": false,
      "22.03.2025": false,
      "23.03.2025": false,
    },
  },
  {
    id: "9",
    object: "Ноутбук",
    days: {
      "17.03.2025": false,
      "18.03.2025": false,
      "19.03.2025": false,
      "20.03.2025": false,
      "21.03.2025": false,
      "22.03.2025": false,
      "23.03.2025": false,
    },
  },
  {
    id: "10",
    object: "Влад ВПН",
    days: {
      "17.03.2025": true,
      "18.03.2025": false,
      "19.03.2025": false,
      "20.03.2025": false,
      "21.03.2025": false,
      "22.03.2025": false,
      "23.03.2025": false,
    },
  },
];

export const SchedulerPage: FC = () => {
  return (
    <div>
      <HeaderPage
        title="Планировщик мероприятий"
        showSelect={true}
        showButton={false}
      />
      <ScheduleTable data={scheduleData} />
    </div>
  );
};
