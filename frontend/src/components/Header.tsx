import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useAuthPopup } from "../hooks/useAuthPopup";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ModeToggle } from "./MoonToggle";
import Image from "../../public/Logo.avif";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { TbBellOff, TbBell } from "react-icons/tb";
import { setAlert } from "../store/slices/userSlice";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Home", to: "/", current: false },
  { name: "Volunteer", to: "/volunteer", current: false },
  { name: "Precautions", to: "/precaution", current: false },
  { name: "Subscribe To Alerts", to: "/alert", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state: RootState) => state.user.authStatus);
  const userDetails = useSelector((state: RootState) => state.user.userDetails);
  const alert = useSelector((state: RootState) => state.user.alert);
  const {
    openSignIn,
    showSignIn,
    isSignUp,
    toggleMode,
    closeSignIn,
    handleAuthSuccess,
  } = useAuthPopup();
  const location = useLocation();

  const currentNavigation = navigation.map((item) => ({
    ...item,
    current: location.pathname === item.to,
  }));

  const toggleAlert = async () => {
    if (!authStatus) {
      openSignIn();
      return;
    }
    dispatch(setAlert(!alert));
  };

  return (
    <Disclosure
      as="nav"
      className="bg-white/80 backdrop-blur-md dark:bg-gray-800/90 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white focus:outline-none">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-5 w-5 transition-transform group-hover:scale-110" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-start sm:items-stretch">
            <div className="flex shrink-0 items-center">
              <Link
                to="/"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <img alt="DisasterBusters" src={Image} className="h-8 w-auto" />
                <span className="font-semibold text-gray-900 dark:text-white hidden sm:block">
                  DisasterBusters
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:block">
              <div className="flex space-x-1">
                {currentNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-white",
                      "rounded-lg px-4 py-2 text-md font-medium transition-all duration-200 hover:scale-105"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleAlert}
              className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-all duration-200 hover:scale-105"
            >
              {alert ? <TbBellOff className="h-5 w-5" /> : <TbBell className="h-5 w-5" />}
            </button>

            <div className="flex items-center">
              <ModeToggle />
            </div>

            {authStatus && userDetails && (
              <div className="flex items-center gap-3 ml-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {userDetails.firstName || userDetails.username}
                </span>
                {userDetails.imageUrl ? (
                  <img
                    className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-700 transition-transform hover:scale-110"
                    src={userDetails.imageUrl}
                    alt="Profile"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600 dark:text-white">
                      {(userDetails.firstName?.[0] || userDetails.username?.[0] || "?").toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-3 pb-3 pt-2">
          {currentNavigation.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={classNames(
                item.current
                  ? "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-white",
                "block rounded-lg px-3 py-2 text-base font-medium transition-colors"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </DisclosurePanel>

      {showSignIn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 relative">
            <button onClick={closeSignIn} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <XMarkIcon className="h-6 w-6" />
            </button>
            {isSignUp ? (
              <SignUp
                routing="virtual"
                redirectUrl={window.location.href}
                appearance={{ elements: { footerActionLink: { onClick: (e) => e.preventDefault() }, rootBox: { boxShadow: "none" } }}}
                afterSignUp={() => (handleAuthSuccess(), false)}
              />
            ) : (
              <SignIn
                routing="virtual"
                redirectUrl={window.location.href}
                appearance={{ elements: { footerActionLink: { onClick: (e) => e.preventDefault() }, rootBox: { boxShadow: "none" } }}}
                afterSignIn={() => (handleAuthSuccess(), false)}
              />
            )}
          </div>
        </div>
      )}
    </Disclosure>
  );
}

