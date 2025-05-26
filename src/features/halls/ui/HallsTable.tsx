import { FC } from "react";
import { Table } from "@shared/ui";
import { Halls } from "../model/types";

interface HallsTableProps {
  data: {
    columns: { key: string; title: string }[];
    rows: Halls[];
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  showPlayButton?: boolean;
}

export const HallsTable: FC<HallsTableProps> = ({
  data,
  onEdit,
  onDelete,
  showPlayButton = false,
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
