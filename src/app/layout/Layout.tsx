import { FC, ReactNode } from "react";
import "./styles.scss";
import { SidebarMenu } from "@shared/ui";

interface ILayoutProps {
  children: ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
  const handleLogout = () => {
    console.log("Logout logic here");
  };

  return (
    <div className="layout">
      <SidebarMenu onLogout={handleLogout} />
      <main className="content">{children}</main>
    </div>
  );
};
