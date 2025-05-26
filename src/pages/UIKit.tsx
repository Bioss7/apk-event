import { EventModal } from "@features/events/ui/EventModal";
import {
  Button,
  Select,
  Input,
  InputTime,
  CalendarInput,
  Checkbox,
  IconButton,
  Table,
  HeaderPage,
  FloatingMenu,
} from "@shared/ui";
import { ItemSeat } from "@shared/ui/ItemSeat";
import { FC, useState } from "react";
import { Modal } from "@shared/ui/Modal";

const options = [
  { label: "Option One", value: "1" },
  { label: "Option Two", value: "2" },
  { label: "Option Three", value: "3" },
];

export const UIKit: FC = () => {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [selectError] = useState(true);
  const [date, setDate] = useState<Date | null>(new Date());
  const [isModalSideOpen, setIsModalSideOpen] = useState(false);

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
        id: "№ 69 «Новое мероприятие»",
        title: "ЦИРК. Крутосветное путешествие богатыря",
        startTime: "160000",
        hall: "Тестовый зал",
      },
    ],
  };

  const handleSubmit = async (data: any) => {
    console.log("Данные мероприятия:", data);
  };

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const confirmModal = () => {
    // удаление мероприятия
    closeModal();
  };
  const openModal2 = () => setIsModalOpen2(true);
  const closeModal2 = () => setIsModalOpen2(false);
  const openModal3 = () => setIsModalOpen3(true);
  const closeModal3 = () => setIsModalOpen3(false);
  const openModal4 = () => setIsModalOpen4(true);
  const closeModal4 = () => setIsModalOpen4(false);

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
          <h2>CalendarInput</h2>
          <CalendarInput
            selectedDate={date}
            onChange={setDate}
            // minDate={new Date(2025, 0, 1)} // 1 января 2025
            // maxDate={new Date(2025, 11, 31)} // 31 декабря 2025
          />
          <CalendarInput selectedDate={date} onChange={setDate} error={true} />
        </div>
        <div className="col-flex">
          <h2>Checkbox</h2>
          <Checkbox label="Нумерация слева-направо" variant="checkbox-gray" />
          <Checkbox label="Нумерация слева-направо" variant="checkbox-white" />
          <Checkbox
            label="Нумерация слева-направо"
            variant="checkbox-white"
            disabled
          />
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
        <div className="col-flex">
          <IconButton iconName="pause" onClick={() => alert("123")} size={40} />
          <IconButton iconName="start" />
          <IconButton iconName="edit" />
          <IconButton iconName="delete" />
          <IconButton iconName="arrow-left" />
          <IconButton iconName="arrow-right" />
        </div>
      </div>
      <div className="row-flex">
        <HeaderPage title="Управление мероприятиями" />
        <Table
          data={tableData}
          showPlayButton={true}
          onEdit={(id) => console.log("Edit", id)}
          onDelete={(id) => console.log("Delete", id)}
        />

        <Button onClick={() => setIsModalSideOpen(true)}>
          Создать мероприятие
        </Button>

        <EventModal
          isOpen={isModalSideOpen}
          onClose={() => setIsModalSideOpen(false)}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="row-flex">
        <div className="col-flex">
          <h2>Modal</h2>
          <IconButton iconName="delete" onClick={openModal} />
          <Modal
            title="Удалить мероприятие?"
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={confirmModal}
            cancelText="Отменить"
            confirmText="Удалить"
          />
          <Button variant="button-primary" onClick={openModal2}>
            Ошибка
          </Button>
          <Modal
            title="Ошибка"
            text="При удалении возникла ошибка, попробуйте еще раз"
            isOpen={isModalOpen2}
            onClose={closeModal2}
            confirmText="Хорошо"
          />
          <Button variant="button-primary" onClick={openModal3}>
            Мероприятие добавлено
          </Button>
          <Modal
            title="Мероприятие добавлено"
            isOpen={isModalOpen3}
            onClose={closeModal3}
            confirmText="Хорошо"
          />
          <Button variant="button-primary" onClick={openModal4}>
            Мероприятие удалено
          </Button>
          <Modal
            title="Мероприятие удалено"
            isOpen={isModalOpen4}
            onClose={closeModal4}
            confirmText="Хорошо"
          />
        </div>
        <FloatingMenu />
      </div>
      <div className="row-flex">
        <div className="col-flex">
          <h2>Sector elements</h2>
          <div className="row-flex">
            <ItemSeat sector="A" />
            <ItemSeat sector="A" icon="OFF" />
            <ItemSeat sector="A" icon="OFF" isDisabled />
            <ItemSeat sector="A" isDisabled />
          </div>
          <div className="row-flex">
            <ItemSeat sector="B" />
            <ItemSeat sector="B" icon="BLOCK" />
            <ItemSeat sector="B" icon="BLOCK" isDisabled />
          </div>
          <div className="row-flex">
            <ItemSeat sector="C" />
            <ItemSeat sector="C" icon="TEMP_BLOCK" />
            <ItemSeat sector="C" icon="TEMP_BLOCK" isDisabled />
          </div>
          <div className="row-flex">
            <ItemSeat sector="D" />
            <ItemSeat sector="D" icon="BOOK" />
            <ItemSeat sector="D" icon="BOOK" isDisabled />
          </div>
          <div className="row-flex">
            <ItemSeat sector="E" />
            <ItemSeat sector="E" icon="CLEAR" />
            <ItemSeat sector="E" icon="CLEAR" isDisabled />
          </div>
        </div>
      </div>
    </div>
  );
};
