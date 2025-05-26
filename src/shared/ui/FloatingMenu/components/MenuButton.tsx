import { FC, memo } from "react";

interface MenuButtonProps {
  icon: React.ReactNode;
  label?: string;
  isActive: boolean;
  isHidden: boolean;
  onClick: () => void;
  className?: string;
}

export const MenuButton: FC<MenuButtonProps> = memo(
  ({ icon, label, onClick, className = "" }) => (
    <button className={`${className}`} onClick={onClick} aria-label={label}>
      {icon}
      {label && <span>{label}</span>}
    </button>
  )
);
