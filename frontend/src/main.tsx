import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { PUBLISHABLE_KEY } from "../constants.ts";
import { VolunteerPage, Home } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/volunteer",
        element: <VolunteerPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ClerkProvider>
  </StrictMode>
);
