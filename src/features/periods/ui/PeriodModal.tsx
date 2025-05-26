import { useState, FormEvent, useEffect } from "react";
import { Button, SideModal, Input, InputTime } from "@shared/ui";
import { Modal } from "@shared/ui/Modal";

interface IPeriodFormData {
  title: string;
  startTime: string;
  category: string;
  location: string;
}

interface PeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IPeriodFormData) => Promise<void> | void;
  mode?: "create" | "edit";
  initialData?: any;
}

export const PeriodModal = ({
  isOpen,
  onClose,
  onSubmit,
  mode = "create",
  initialData,
}: PeriodModalProps) => {
  const [formData, setFormData] = useState<IPeriodFormData>({
    title: "",
    startTime: "",
    category: "",
    location: "",
  });
  const [errors, setErrors] = useState<Record<keyof IPeriodFormData, string>>({
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

  const handleInputChange = (field: keyof IPeriodFormData, value: string) => {
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
          label="Название мероприятия"
          placeholder="Введите название..."
          value={formData.title}
          onChange={(value) => handleInputChange("title", value)}
          error={!!errors.title}
          description={errors.title}
        />
        <InputTime
          label="Время начала"
          value={formData.startTime}
          onChange={(value) => handleInputChange("startTime", value)}
          error={!!errors.startTime}
          description={errors.startTime}
        />
        <Input
          type="number"
          label="Порог гостей"
          placeholder="Введите название..."
          value={formData.title}
          onChange={(value) => handleInputChange("title", value)}
          error={!!errors.title}
          description={errors.title}
        />
        <Input
          type="number"
          label="Порог смещения"
          placeholder="Введите название..."
          value={formData.title}
          onChange={(value) => handleInputChange("title", value)}
          error={!!errors.title}
          description={errors.title}
        />
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
