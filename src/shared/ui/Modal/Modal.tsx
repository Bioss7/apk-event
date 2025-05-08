import { FC, MouseEvent, useEffect } from "react";
import { createPortal } from "react-dom";
import "./styles.scss";
import { Button } from "../Button";

interface IModalProps {
  title: string;
  text?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const Modal: FC<IModalProps> = ({
  title,
  text,
  isOpen,
  onClose,
  onConfirm,
  confirmText = 'Удалить',
  cancelText = 'Отменить',
}) => {
  const modalRoot = document.getElementById('modal-root');  

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('body-scroll');
    } else {
      document.body.classList.remove('body-scroll');
    }

    return () => {
      document.body.classList.remove('body-scroll');
    };
  }, [isOpen]);

  if (!modalRoot || !isOpen) return null;

  return createPortal (
    <div className="modal-ui__backdrop" onClick={handleBackdropClick}>
      <div className="modal-ui">
        <h2 className="text-24-bold">{title}</h2>
        {text && <p className="modal-ui__text text-18-medium">{text}</p>}
        <div className="modal-ui__buttons">
          {onConfirm ? (
            <>
              <Button
                variant="button-secondary"
                onClick={onClose}
              >
                {cancelText}
              </Button>
              <Button
                variant="button-primary"
                onClick={onConfirm}
              >
                {confirmText}
              </Button>              
            </>
          ) : (
            <Button
              variant="button-primary"
              onClick={onClose}
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>,
    modalRoot
  );
};
