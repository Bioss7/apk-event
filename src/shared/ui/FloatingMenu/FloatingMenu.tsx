import { FC, memo, useState } from "react";
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
  onMenuToggle?: (isHidden: boolean) => void;
  initialIsHidden?: boolean;
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

export const FloatingMenu: FC<FloatingMenuProps> = memo(
  ({ onMenuToggle, initialIsHidden = true }) => {
    const [isHidden, setIsHidden] = useState(initialIsHidden);

    const toggleMenu = () => {
      setIsHidden((prev) => {
        const newState = !prev;
        onMenuToggle?.(newState);
        return newState;
      });
    };

    const handleActionClick = (action: MenuAction) => {
      console.log("Action clicked:", action);
      // Здесь будет логика обработки действий
    };

    return (
      <div className={`floating-menu ${isHidden ? "hidden" : ""}`}>
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
                  isActive={false}
                  isHidden={isHidden}
                  onClick={() => console.log("A")}
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
              <Input type="text" placeholder="1" />
              <Input type="text" placeholder="1" />
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
