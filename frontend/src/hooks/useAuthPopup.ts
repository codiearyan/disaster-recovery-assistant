import { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { setAuthStatus } from "../store/slices/userSlice";

export const useAuthPopup = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const openSignIn = (signUp: boolean = false) => {
    setIsSignUp(signUp);
    setShowSignIn(true);
  };

  const closeSignIn = () => setShowSignIn(false);

  const toggleMode = () => setIsSignUp(!isSignUp);

  const handleAuthSuccess = () => {
    dispatch(setAuthStatus(true));
    closeSignIn();
  };

  return {
    showSignIn,
    isSignUp,
    openSignIn,
    closeSignIn,
    toggleMode,
    handleAuthSuccess,
  };
};
