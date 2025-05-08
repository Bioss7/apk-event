import { useState, FormEvent } from "react";
import { Button, SideModal, Input, Select, InputTime } from "@shared/ui";

interface IEventFormData {
  title: string;
  startTime: string;
  category: string;
  location: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IEventFormData) => Promise<void> | void;
}

export const EventModal = ({ isOpen, onClose, onSubmit }: EventModalProps) => {
  const [formData, setFormData] = useState<IEventFormData>({
    title: "",
    startTime: "",
    category: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = [
    { value: "meeting", label: "Встреча" },
    { value: "conference", label: "Конференция" },
    { value: "webinar", label: "Вебинар" },
  ];

  const locationOptions = [
    { value: "online", label: "Онлайн" },
    { value: "office", label: "Офис" },
    { value: "other", label: "Другое" },
  ];

  const handleInputChange = (field: keyof IEventFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const actions = (
    <>
      <Button
        type="button"
        variant="button-secondary"
        onClick={onClose}
        disabled={isSubmitting}
      >
        Отменить
      </Button>
      <Button type="submit" variant="button-primary">
        Сохранить
      </Button>
    </>
  );

  return (
    <SideModal
      isOpen={isOpen}
      onClose={onClose}
      title="Новое мероприятие"
      actions={actions}
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        label="Название мероприятия"
        placeholder="Введите название..."
        value={formData.title}
        onChange={(value) => handleInputChange("title", value)}
      />

      <InputTime
        label="Время начала"
        value={formData.startTime}
        onChange={(value) => handleInputChange("startTime", value)}
      />

      <Select
        label="Категория"
        options={categoryOptions}
        value={formData.category}
        onChange={(value) => handleInputChange("category", value)}
        placeholder="Выберите категорию"
      />

      <Select
        label="Локация"
        options={locationOptions}
        value={formData.location}
        onChange={(value) => handleInputChange("location", value)}
        placeholder="Выберите локацию"
      />
    </SideModal>
  );
};
