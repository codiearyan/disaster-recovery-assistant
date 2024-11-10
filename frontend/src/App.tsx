import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ThemeProvider } from "./components/ThemeProvider";
import "./App.css";
import { Outlet } from "react-router-dom";
import Mapbox from "./components/map/Map";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ChatBot } from "./components/ChatBot";
import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { setAuthStatus, setUserDetails } from "./store/slices/userSlice";

function AuthStatusManager() {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    const updateAuthStatus = async () => {
      try {
        const token = await getToken();
        if (token) {
          console.log(token);
          dispatch(setAuthStatus(true));
        }
        // Set user details if user is loaded
        if (isLoaded && user && isSignedIn) {
          dispatch(
            setUserDetails({
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.primaryEmailAddress?.emailAddress,
              username: user.username,
              imageUrl: user.imageUrl,
              // Add any other user details you need
            })
          );
        }
      } catch (error) {
        console.error("Auth token error:", error);
        dispatch(setAuthStatus(false));
      }
    };

    updateAuthStatus();
  }, [getToken, dispatch, user, isLoaded]);

  return null;
}

function App() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  return (
    
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App">
      <ChatBot />
    </div> 
      <AuthStatusManager />
      <Header />
      <Outlet />
      <Footer />
    </ThemeProvider>
    
  );
}

export default App;
