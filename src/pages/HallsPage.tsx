import { HallModal } from "@features/halls/ui/HallModal";
import { HallsTable } from "@features/halls/ui/HallsTable";
import { HeaderPage } from "@shared/ui";
import { Modal } from "@shared/ui/Modal";
import { FC, useState } from "react";

const tableData = {
  columns: [
    { key: "title", title: "Название зала" },
    { key: "sectorsHall", title: "Секторов в зале" },
    { key: "rowsSector", title: "Рядов в секторе" },
    { key: "seatsRow", title: "Мест в ряду" },
  ],
  rows: [
    {
      id: "N7",
      title: "«Тестовый зал»",
      sectorsHall: 1,
      rowsSector: 25,
      seatsRow: 30,
    },
    {
      id: "N110",
      title: "«Арена под Навку»",
      sectorsHall: 1,
      rowsSector: 25,
      seatsRow: 30,
    },
    {
      id: "№9",
      title: "«Цирк»",
      hall: "Тестовый зал",
      sectorsHall: 1,
      rowsSector: 25,
      seatsRow: 30,
    },
    {
      id: "№16",
      title: "«Новый зал»",
      sectorsHall: 1,
      rowsSector: 25,
      seatsRow: 30,
    },
  ],
};

export const HallsPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [data, setData] = useState(tableData);
  const [elementToDelete, setElementToDelete] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    console.log("Данные мероприятия:", data);
  };

  const handleEdit = (id: string) => {
    const event = data.rows.find((item) => item.id === id);
    if (event) {
      setCurrentEvent(event);
      setModalMode("edit");
      setIsModalOpen(true);
    }
  };

  const handleAdd = () => {
    setCurrentEvent(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setElementToDelete(id);
    setIsModalConfirmOpen(true);
  };

  const closeModal = () => setIsModalConfirmOpen(false);

  const confirmModal = async () => {
    if (!elementToDelete) return;

    try {
      setData((prev) => ({
        ...prev,
        rows: prev.rows.filter((item) => item.id !== elementToDelete),
      }));
      closeModal();
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      closeModal();
      setIsModalErrorOpen(true);
    }
  };

  return (
    <div>
      <HeaderPage title="Управление залами" onClick={handleAdd} />
      <HallsTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
      <HallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        mode={modalMode}
        initialData={currentEvent}
      />
      <Modal
        title="Ошибка"
        text="При удалении возникла ошибка, попробуйте еще раз"
        isOpen={isModalErrorOpen}
        onClose={() => setIsModalErrorOpen(false)}
        confirmText="Хорошо"
      />
      <Modal
        title="Удалить мероприятие?"
        isOpen={isModalConfirmOpen}
        onClose={closeModal}
        onConfirm={confirmModal}
        cancelText="Отменить"
        confirmText="Удалить"
      />
    </div>
  );
};
