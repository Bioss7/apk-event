import { EventModal } from "@features/events/ui/EventModal";
import { EventsTable } from "@features/events/ui/EventsTable";
import { HeaderPage } from "@shared/ui";
import { Modal } from "@shared/ui/Modal";
import { FC, useState } from "react";

const tableData = {
  columns: [
    { key: "title", title: "Название мероприятия" },
    { key: "startTime", title: "Время начала" },
    { key: "hall", title: "Зал" },
  ],
  rows: [
    {
      id: "N44",
      title: "Тестовое мероприятие",
      startTime: "235000",
      hall: "Тестовый зал",
    },
    {
      id: "N110",
      title: "ЦИРК. Крутосветное путешествие богатыря",
      startTime: "160000",
      hall: "Тестовый зал",
    },
    {
      id: "№ 69",
      title: "ЦИРК. Крутосветное путешествие богатыря",
      startTime: "160000",
      hall: "Тестовый зал",
    },
  ],
};

export const EventsPage: FC = () => {
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
      <HeaderPage title="Управление мероприятиями" onClick={handleAdd} />
      <EventsTable
        data={data}
        onEdit={handleEdit}
        // onDelete={(id) => console.log("Delete", id)}
        onDelete={handleDelete}
      />
      <EventModal
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
