import { FC, useState } from "react";
import { IconButton } from "../IconButton";
import "./styles.scss";

interface TableData {
  id: string;
  title: string;
  startTime: string;
  hall: string;
}

interface TableProps {
  data: TableData[];
  showPlayButton?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const Table: FC<TableProps> = ({
  data,
  showPlayButton = false,
  onEdit,
  onDelete,
}) => {
  const [activeItems, setActiveItems] = useState<Record<string, boolean>>({});

  const formatTime = (timeString: string) => {
    if (timeString.length === 6) {
      return `${timeString.slice(0, 2)}:${timeString.slice(
        2,
        4
      )}:${timeString.slice(4)}`;
    }
    return timeString;
  };

  const toggleItem = (id: string) => {
    setActiveItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {showPlayButton && <th></th>}
            <th>№</th>
            <th>Название мероприятия</th>
            <th>Время начала</th>
            <th>Зал</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {showPlayButton && (
                <td>
                  <IconButton
                    iconName={activeItems[item.id] ? "pause" : "start"}
                    onClick={() => toggleItem(item.id)}
                  />
                </td>
              )}
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{formatTime(item.startTime)}</td>
              <td>{item.hall}</td>
              <td>
                <div className="table-actions">
                  <IconButton
                    iconName="edit"
                    onClick={() => onEdit?.(item.id)}
                  />
                  <IconButton
                    iconName="delete"
                    onClick={() => onDelete?.(item.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
