import { FC, useRef, useState } from "react";
import "./styles.scss";
import { Icon } from "@shared/ui/Icon";

interface IItemSeatProps {
  sector: "A" | "B" | "C" | "D" | "E";
  icon?: "OFF" | "BLOCK" | "TEMP_BLOCK" | "BOOK" | "CLEAR" | null;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export const ItemSeat: FC<IItemSeatProps> = ({
  sector, icon = null, isDisabled = false, onClick, 
}) => {
  const [selected, setSelected] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getSectorColorValue = (): string => {
    switch (sector) {
      case 'A': return '#264653'; 
      case 'B': return '#2A9D8F';
      case 'C': return '#7FA12F';
      case 'D': return '#CC66CC';
      case 'E': return '#8338EC';
      default: return '#264653';
    }
  };

  const iconColor = isDisabled || selected ? '#8E8E8E' : getSectorColorValue();

  const getSectorClass = (): string => {
    return `sector-${sector.toLowerCase()}`;
  };

  const getIconComponent = () => {
    if (!icon) return null;
    let iconName = "";
    switch (icon) {
      case 'OFF': iconName = 'off'; break;
      case 'BLOCK': iconName = 'block'; break;
      case 'TEMP_BLOCK': iconName = 'temp-block'; break;
      case 'BOOK': iconName = 'book'; break;
      case 'CLEAR': iconName = 'clear'; break;
      default: return null;
    }
    return <Icon name={iconName} color={iconColor} />;
  };

  const handleClick = (e: React.MouseEvent) => {
    setSelected(!selected);
    if (onClick) onClick(e);
  };

  return (
    <button 
      ref={buttonRef}
      className={`item-seat ${getSectorClass()} ${isDisabled ? 'disabled' : ''} ${selected ? 'selected' : ''} ${icon ? 'icon' : ''}`} 
      onClick={handleClick}
      aria-pressed={selected}
      disabled={isDisabled}
    >
      {icon && getIconComponent()}
    </button>
  );
};
