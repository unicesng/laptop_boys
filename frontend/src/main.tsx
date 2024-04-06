import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing.tsx";
import Login from "./Login.tsx";
import Profile from './Profile.tsx'
import "./index.css";
import SidebarNav from "./SideBarNav.tsx";
import Dashboard from "./Dashboard.tsx";
import Metric from "./Metric.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <div className="flex">
      <SidebarNav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/metric" element={<Metric />} />
      </Routes>
    </div>
  </BrowserRouter>
);
