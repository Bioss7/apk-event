import { FC, useState, useEffect } from "react";
import "./styles.scss";
import { IconButton } from "../IconButton";

interface ISideModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
}

export const SideModal: FC<ISideModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  onSubmit,
}) => {
  const [, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsVisible(true);
    } else {
      document.body.style.overflow = "";
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <>
      <div
        className={`side-modal-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />
      <div className={`side-modal ${isOpen ? "open" : ""}`}>
        <IconButton
          iconName="close"
          onClick={onClose}
          className="side-modal-close"
        />
        <div className="side-modal-header">
          {title && <h2 className="side-modal-title text-32-bold">{title}</h2>}
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="side-modal-content">{children}</div>
          {actions && <div className="side-modal-actions">{actions}</div>}
        </form>
      </div>
    </>
  );
};
