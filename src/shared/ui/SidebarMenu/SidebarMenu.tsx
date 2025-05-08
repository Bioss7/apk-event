import { FC, memo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "../Icon/Icon";
import { Logo, LogoHide } from "../Icon";
import { MenuButton } from "./components/MenuButton";
import "./styles.scss";

interface SidebarMenuProps {
  onMenuToggle?: (isHidden: boolean) => void;
  onLogout?: () => void;
  initialIsHidden?: boolean;
}

type MenuItem =
  | "ui"
  | "events"
  | "halls"
  | "periods"
  | "scheduler"
  | "picture-hall"
  | "devices";

interface MenuItemConfig {
  id: MenuItem;
  iconName: string;
  label: string;
}

const MENU_ITEMS: MenuItemConfig[] = [
  { id: "ui", iconName: "events", label: "UIKit" },
  { id: "events", iconName: "events", label: "Мероприятия" },
  { id: "halls", iconName: "halls", label: "Залы" },
  { id: "periods", iconName: "periods", label: "Периоды" },
  { id: "scheduler", iconName: "scheduler", label: "Планировщик" },
  { id: "picture-hall", iconName: "picture-hall", label: "Картинка зала" },
  { id: "devices", iconName: "devices", label: "Устройства" },
];

export const SidebarMenu: FC<SidebarMenuProps> = memo(
  ({ onMenuToggle, onLogout, initialIsHidden = false }) => {
    const [isHidden, setIsHidden] = useState(initialIsHidden);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => {
      const newState = !isHidden;
      setIsHidden(newState);
      onMenuToggle?.(newState);
    };

    const handleTabClick = (tab: MenuItem) => {
      navigate(`/${tab}`);
    };

    const activeTab = (location.pathname.split("/")[1] as MenuItem) || "events";

    return (
      <aside
        className={`sidebar ${isHidden ? "hidden" : ""}`}
        aria-hidden={isHidden}
      >
        <div className="sidebar-top">
          <div className="sidebar-logo">
            {isHidden ? <LogoHide /> : <Logo />}
          </div>
          <nav aria-label="Основное меню">
            <ul>
              {MENU_ITEMS.map((item) => (
                <li key={item.id}>
                  <MenuButton
                    iconName={item.iconName}
                    label={item.label}
                    isActive={activeTab === item.id}
                    isHidden={isHidden}
                    onClick={() => handleTabClick(item.id)}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="sidebar-bottom">
          <ul>
            <li>
              <button onClick={onLogout}>
                <Icon name="logout" size={24} />
                {!isHidden && <span>Выйти</span>}
              </button>
            </li>
            <li>
              <button
                onClick={toggleMenu}
                aria-label={isHidden ? "Показать меню" : "Скрыть меню"}
              >
                <Icon
                  name={isHidden ? "hide-menu-right" : "hide-menu-left"}
                  size={24}
                />
                {!isHidden && <span>Скрыть меню</span>}
              </button>
            </li>
          </ul>
        </div>
      </aside>
    );
  }
);
