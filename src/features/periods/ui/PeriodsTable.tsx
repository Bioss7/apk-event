import { FC } from "react";
import { Table } from "@shared/ui";
import { Periods } from "../model/types";

interface PeriodsTableProps {
  data: {
    columns: { key: string; title: string }[];
    rows: Periods[];
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  showPlayButton?: boolean;
}

export const PeriodsTable: FC<PeriodsTableProps> = ({
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
