import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  return (
    <div className="layout-container">
      <Header />

      <main className="layout-main">
        <div className="fade-in-up">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
