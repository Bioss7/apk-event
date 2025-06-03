import { HallManagement } from "@features/hall-management/ui/HallManagement";
import { HeaderPage } from "@shared/ui";

export const PictureHallPage = () => {
  return (
    <div>
      <HeaderPage
        title="Управление залом №7 на мероприятие №4 по состоянию на 17.03.2025"
        onClick={() => {}}
        showSelect={true}
        showCalendarInput={true}
        showButton={false}
      />
      <HallManagement />
    </div>
  );
};
