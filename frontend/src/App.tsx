import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ThemeProvider } from "./components/ThemeProvider";
import "./App.css";
import { Outlet } from "react-router-dom";
import Mapbox from "./components/map/Map";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { setAuthStatus } from "./store/slices/userSlice";
function App() {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  useEffect(() => {
    const updateAuthStatus = async () => {
      try {
        const token = await getToken();
        dispatch(setAuthStatus(true));
      } catch (error) {
        console.error("Auth token error:", error);
        dispatch(setAuthStatus(false));
      }
    };

    updateAuthStatus();
  }, [getToken, dispatch]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <Outlet />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
