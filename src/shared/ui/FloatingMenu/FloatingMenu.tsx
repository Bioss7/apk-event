import { FC, memo, useState, useEffect } from "react";
import { MenuButton } from "./components/MenuButton";
import "./styles.scss";
import {
  BlockIcon,
  DisableIcon,
  ReserveIcon,
  TemporaryBlockIcon,
  ClearIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  SectorAIcon,
  SectorBIcon,
  SectorCIcon,
  SectorDIcon,
  SectorEIcon,
} from "../Icons";
import { Input } from "../Input";

interface FloatingMenuProps {
  selectedSeats?: Set<string>;
  onMenuToggle?: (isHidden: boolean) => void;
  initialIsHidden?: boolean;
  onSeatRangeChange?: (from: string, to: string) => void;
  onActionClick?: (
    action: "disable" | "block" | "temporaryBlock" | "reserve" | "clear"
  ) => void;
  onSectorChange?: (sector: "A" | "B" | "C" | "D" | "E") => void;
  currentSector?: "A" | "B" | "C" | "D" | "E";
  isFixed?: boolean;
}

type MenuAction = "disable" | "block" | "temporaryBlock" | "reserve" | "clear";
type SectorAction = "sectorA" | "sectorB" | "sectorC" | "sectorD" | "sectorE";

interface MenuActionConfig {
  id: MenuAction;
  icon: React.ReactNode;
  label: string;
}

interface SectorActionConfig {
  id: SectorAction;
  icon: React.ReactNode;
}

const actionIcons = {
  disable: <DisableIcon />,
  block: <BlockIcon />,
  temporaryBlock: <TemporaryBlockIcon />,
  reserve: <ReserveIcon />,
  clear: <ClearIcon />,
};

const PLACE_ACTIONS: MenuActionConfig[] = [
  { id: "disable", icon: actionIcons.disable, label: "Отключить" },
  { id: "block", icon: actionIcons.block, label: "Блокировать" },
  {
    id: "temporaryBlock",
    icon: actionIcons.temporaryBlock,
    label: "Временная блокировка",
  },
  { id: "reserve", icon: actionIcons.reserve, label: "Бронировать" },
  { id: "clear", icon: actionIcons.clear, label: "Очистить" },
];

const SECTOR_ACTIONS: SectorActionConfig[] = [
  { id: "sectorA", icon: <SectorAIcon /> },
  { id: "sectorB", icon: <SectorBIcon /> },
  { id: "sectorC", icon: <SectorCIcon /> },
  { id: "sectorD", icon: <SectorDIcon /> },
  { id: "sectorE", icon: <SectorEIcon /> },
];

const getSeatRanges = (selectedSeats: Set<string>) => {
  if (!selectedSeats || selectedSeats.size === 0) return { from: "", to: "" };

  const seatNumbers = Array.from(selectedSeats)
    .map((seat) => {
      const [row, seatIndex] = seat.split("-").map(Number);
      return row * 53 + seatIndex + 1; // 53 мест в ряду
    })
    .sort((a, b) => a - b);

  if (seatNumbers.length === 1) {
    return { from: seatNumbers[0].toString(), to: seatNumbers[0].toString() };
  }

  const min = Math.min(...seatNumbers);
  const max = Math.max(...seatNumbers);

  return { from: min.toString(), to: max.toString() };
};

export const FloatingMenu: FC<FloatingMenuProps> = memo(
  ({
    selectedSeats = new Set<string>(),
    onMenuToggle,
    initialIsHidden = true,
    onSeatRangeChange,
    onActionClick,
    onSectorChange,
    currentSector = "A",
    isFixed = true,
  }) => {
    const [isHidden, setIsHidden] = useState(initialIsHidden);
    const [inputValues, setInputValues] = useState({ from: "", to: "" });

    useEffect(() => {
      const ranges = getSeatRanges(selectedSeats);
      setInputValues((prev) => {
        if (prev.from !== ranges.from || prev.to !== ranges.to) {
          return ranges;
        }
        return prev;
      });
    }, [selectedSeats]);

    const handleFromChange = (value: string) => {
      setInputValues((prev) => ({ ...prev, from: value }));
      onSeatRangeChange?.(value, inputValues.to);
    };

    const handleToChange = (value: string) => {
      setInputValues((prev) => ({ ...prev, to: value }));
      onSeatRangeChange?.(inputValues.from, value);
    };

    const toggleMenu = () => {
      setIsHidden((prev) => {
        const newState = !prev;
        onMenuToggle?.(newState);
        return newState;
      });
    };

    const handleActionClick = (
      action: "disable" | "block" | "temporaryBlock" | "reserve" | "clear"
    ) => {
      onActionClick?.(action);
    };

    const handleSectorClick = (sector: "A" | "B" | "C" | "D" | "E") => {
      onSectorChange?.(sector);
    };

    return (
      <div
        className={`floating-menu ${isHidden ? "hidden" : ""} ${
          isFixed ? "" : "static"
        }`}
      >
        <div className="floating-menu__elements">
          <div className="floating-menu__title">Управление местами</div>
          {isHidden && (
            <div className="floating-menu__actions">
              {PLACE_ACTIONS.map((action) => (
                <MenuButton
                  key={action.id}
                  icon={action.icon}
                  label={action.label}
                  isActive={false}
                  isHidden={isHidden}
                  onClick={() => handleActionClick(action.id)}
                  className="button-place"
                />
              ))}
            </div>
          )}
        </div>

        <div className="floating-menu__elements">
          <div className="floating-menu__title">Управление секторами</div>
          {isHidden && (
            <div className="floating-menu__actions">
              {SECTOR_ACTIONS.map((action) => (
                <MenuButton
                  key={action.id}
                  icon={action.icon}
                  isActive={currentSector === action.id.replace("sector", "")}
                  isHidden={isHidden}
                  onClick={() =>
                    handleSectorClick(
                      action.id.replace("sector", "") as
                        | "A"
                        | "B"
                        | "C"
                        | "D"
                        | "E"
                    )
                  }
                  className="button-sector"
                />
              ))}
            </div>
          )}
        </div>

        <div className="floating-menu__elements">
          <div className="floating-menu__title">Выбранные места</div>
          {isHidden && (
            <div className="floating-menu__actions floating-menu__actions--input">
              <Input
                type="number"
                placeholder="От"
                value={inputValues.from}
                onChange={handleFromChange}
              />
              <Input
                type="number"
                placeholder="До"
                value={inputValues.to}
                onChange={handleToChange}
              />
            </div>
          )}
        </div>

        <button
          className="button-toggle"
          onClick={toggleMenu}
          aria-label={isHidden ? "Показать меню" : "Скрыть меню"}
        >
          {isHidden ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </button>
      </div>
    );
  }
);
