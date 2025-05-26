import { FC, useState } from "react";
import { IconButton } from "../IconButton";
import { Checkbox } from "@shared/ui/Checkbox";
import "./styles.scss";

interface ScheduleItem {
  id: string;
  object: string;
  days: {
    [date: string]: boolean;
  };
}

interface ScheduleTableProps {
  data: ScheduleItem[];
}

export const ScheduleTable: FC<ScheduleTableProps> = ({ data }) => {
  const getPreviousMonday = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const generateWeekDates = (startDate: Date) => {
    const daysOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      const fullDate = `${day}.${month}.${year}`;
      dates.push({
        dayName: daysOfWeek[i],
        fullDate: fullDate,
        isWeekend: daysOfWeek[i] === "СБ" || daysOfWeek[i] === "ВС",
      });
    }
    return dates;
  };

  // Начальная дата - понедельник текущей недели
  const [currentWeekStart, setCurrentWeekStart] = useState(
    getPreviousMonday(new Date())
  );
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>(data);
  const weekDates = generateWeekDates(currentWeekStart);

  const handlePrevWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  const handleDayStatusChange = (
    id: string,
    date: string,
    checked: boolean
  ) => {
    setScheduleData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? { ...item, days: { ...item.days, [date]: checked } }
          : item
      )
    );
  };

  return (
    <div className="table-container">
      <table className="table-schedule">
        <thead>
          <tr>
            <th>Объект</th>
            <th>
              <IconButton iconName="arrow-left" onClick={handlePrevWeek} />
            </th>
            {weekDates.map(({ dayName, fullDate, isWeekend }) => (
              <th
                key={fullDate}
                className={isWeekend ? "weekend-header" : "day-header"}
              >
                <div className="date-header">
                  <span className="day-name">{dayName}</span>
                  <span className="date">{fullDate}</span>
                </div>
              </th>
            ))}
            <th>
              <IconButton iconName="arrow-right" onClick={handleNextWeek} />
            </th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((item) => (
            <tr key={item.id}>
              <td>{item.object}</td>
              <td></td>
              {weekDates.map(({ fullDate, isWeekend }) => (
                <td
                  key={`${item.id}-${fullDate}`}
                  className={isWeekend ? "weekend-cell" : ""}
                >
                  <div className="day-checkbox">
                    <Checkbox
                      checked={item.days[fullDate] || false}
                      onChange={(checked) =>
                        handleDayStatusChange(item.id, fullDate, checked)
                      }
                      variant={isWeekend ? "checkbox-white" : "checkbox-gray"}
                    />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
