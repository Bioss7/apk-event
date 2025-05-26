import { FC } from "react";
import { Table } from "@shared/ui";
import { Events } from "../model/types";

interface EventsTableProps {
  data: {
    columns: { key: string; title: string }[];
    rows: Events[];
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  showPlayButton?: boolean;
}

export const EventsTable: FC<EventsTableProps> = ({
  data,
  onEdit,
  onDelete,
  showPlayButton = true,
}) => {
  return (
    <Table
      data={data}
      showPlayButton={showPlayButton}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};
