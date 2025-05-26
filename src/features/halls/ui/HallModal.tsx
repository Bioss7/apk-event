import { useState, FormEvent, useEffect } from "react";
import { Button, SideModal, Input, Select, Checkbox } from "@shared/ui";
import { Modal } from "@shared/ui/Modal";

interface IHallFormData {
  title: string;
  startTime: string;
  category: string;
  location: string;
}

interface HallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IHallFormData) => Promise<void> | void;
  mode?: "create" | "edit";
  initialData?: any;
}

export const HallModal = ({
  isOpen,
  onClose,
  onSubmit,
  mode = "create",
  initialData,
}: HallModalProps) => {
  const [formData, setFormData] = useState<IHallFormData>({
    title: "",
    startTime: "",
    category: "",
    location: "",
  });
  const [errors, setErrors] = useState<Record<keyof IHallFormData, string>>({
    title: "",
    startTime: "",
    category: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        title: initialData.title || "",
        startTime: initialData.startTime || "",
        category: "meeting",
        location: "online",
      });
    } else {
      setFormData({
        title: "",
        startTime: "",
        category: "",
        location: "",
      });
    }
    setErrors({
      title: "",
      startTime: "",
      category: "",
      location: "",
    });
  }, [mode, initialData, isOpen]);

  const numberingTypeOptions = [
    { value: "meeting", label: "Встреча" },
    { value: "conference", label: "Конференция" },
    { value: "webinar", label: "Вебинар" },
  ];

  const handleInputChange = (field: keyof IHallFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validateForm = (): boolean => {
    const newErrors = {
      title: !formData.title ? "Пожалуйста, введите название мероприятия" : "",
      startTime: !formData.startTime ? "Укажите время начала мероприятия" : "",
      category: !formData.category ? "Пожалуйста, выберите категорию" : "",
      location: !formData.location ? "Пожалуйста, выберите локацию" : "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setIsModalOpen(true);
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
      <Button type="submit" variant="button-primary" disabled={isSubmitting}>
        {mode === "create" ? "Создать" : "Сохранить"}
      </Button>
    </>
  );

  return (
    <>
      <SideModal
        isOpen={isOpen}
        onClose={onClose}
        title={
          mode === "create"
            ? "Создать зал"
            : `Редактирование «${initialData.title}»`
        }
        actions={actions}
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          label="Название зала"
          placeholder="Введите название..."
          value={formData.title}
          onChange={(value) => handleInputChange("title", value)}
          error={!!errors.title}
          description={errors.title}
        />
        <Input
          type="text"
          label="Секторов в зале"
          placeholder="Введите название..."
          value={formData.title}
          onChange={(value) => handleInputChange("title", value)}
          error={!!errors.title}
          description={errors.title}
        />
        <Input
          type="text"
          label="Рядов в секторе"
          placeholder="Введите название..."
          value={formData.title}
          onChange={(value) => handleInputChange("title", value)}
          error={!!errors.title}
          description={errors.title}
        />
        <Input
          type="text"
          label="Мест в ряду"
          placeholder="Введите название..."
          value={formData.title}
          onChange={(value) => handleInputChange("title", value)}
          error={!!errors.title}
          description={errors.title}
        />
        <Select
          label="Тип нумерации"
          options={numberingTypeOptions}
          value={formData.category}
          onChange={(value) => handleInputChange("category", value)}
          placeholder="Тип нумерации"
          error={!!errors.category}
          description={errors.category}
        />
        <Checkbox label="Нумерация слева-направо" variant="checkbox-gray" />
      </SideModal>
      <Modal
        title="Мероприятие добавлено"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        confirmText="Хорошо"
      />
    </>
  );
};
