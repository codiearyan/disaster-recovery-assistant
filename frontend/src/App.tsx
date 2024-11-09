import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ThemeProvider } from "./components/ThemeProvider";
import "./App.css";
import { Outlet } from "react-router-dom";
import Mapbox from "./components/map/Map";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Outlet />
      <Header />
      <Footer />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
