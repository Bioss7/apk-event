import { FC } from "react";
import "./styles.scss";
import { Icon, IconName } from "../Icon/Icon";

interface IIconButtonProps {
  iconName: IconName;
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
  size?: number;
  ariaLabel?: string;
  className?: string;
}

export const IconButton: FC<IIconButtonProps> = ({
  iconName,
  onClick,
  disabled = false,
  color,
  size = 40,
  ariaLabel = "",
  className = "",
}) => {
  return (
    <button
      className={`icon-button ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <Icon
        name={iconName}
        color={color}
        size={size}
        className="icon-button__icon"
      />
    </button>
  );
};
