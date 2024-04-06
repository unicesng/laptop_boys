import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing.tsx";
import Login from "./Login.tsx";
import "./index.css";
import SidebarNav from "./SideBarNav.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <div className="flex">
      <SidebarNav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
    </div>
  </BrowserRouter>
);
