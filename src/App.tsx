import "@styles/global.scss";
import { UIKit } from "@pages/UIKit";
import { EventsPage } from "@pages/EventsPage";
import { Layout } from "@app/layout/Layout";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/ui" element={<UIKit />} />
        <Route path="/events" element={<EventsPage />} />
        {/* <Route path="/periods" element={<PeriodsPage />} />
      <Route path="/scheduler" element={<SchedulerPage />} />
      <Route path="/picture-hall" element={<PictureHallPage />} />
      <Route path="/devices" element={<DevicesPage />} />
      <Route path="*" element={<EventsPage />} />  */}
      </Routes>
    </Layout>
  );
}

export default App;
