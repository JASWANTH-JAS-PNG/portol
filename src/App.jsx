import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider, useAppContext } from "./context/AppContext";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Inbox from "./pages/Inbox";
import MyTeam from "./pages/MyTeam";
import MyFinances from "./pages/MyFinances";
import Employees from "./pages/Employees";
import Engage from "./pages/Engage";
import Helpdesk from "./pages/Helpdesk";
import Performance from "./pages/Performance";
import Profile from "./pages/Profile";
import Preferences from "./pages/Preferences";
import LoggedOut from "./pages/LoggedOut";

function AppRoutes() {
  const { isLoggedIn } = useAppContext();

  if (!isLoggedIn) {
    return <LoggedOut />;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/me/attendance" element={<Attendance />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/my-team" element={<MyTeam />} />
        <Route path="/my-finances" element={<MyFinances />} />
        <Route path="/org" element={<Employees />} />
        <Route path="/engage" element={<Engage />} />
        <Route path="/helpdesk" element={<Helpdesk />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/preferences" element={<Preferences />} />
      </Routes>
    </DashboardLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
