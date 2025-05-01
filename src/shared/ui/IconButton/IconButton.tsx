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
}

export const IconButton: FC<IIconButtonProps> = ({
  iconName,
  onClick,
  disabled = false,
  color,
  size = 40,
  ariaLabel = "",
}) => {
  return (
    <button
      className="icon-button"
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
