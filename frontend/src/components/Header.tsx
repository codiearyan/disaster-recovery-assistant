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
import { Link } from "react-router-dom";
const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Volunteer", href: "/volunteer", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
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
  const toggleAlert = async () => {
    if (!authStatus) {
      openSignIn();
      return;
    } else {
      dispatch(setAlert(!alert));
    }
  };

  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-800 rounded-lg">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-start sm:items-stretch">
            <div className="flex shrink-0 items-center">
              <img alt="Your Company" src={Image} className="h-8 w-auto" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleAlert}
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              {alert ? (
                <TbBellOff aria-hidden="true" className="h-6 w-6" />
              ) : (
                <TbBell aria-hidden="true" className="h-6 w-6" />
              )}
            </button>
            <div className="flex items-center">
              <ModeToggle />
            </div>
            {authStatus && userDetails && (
              <div className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300">
                  {userDetails.firstName || userDetails.username}
                </span>
                {userDetails.imageUrl && (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={userDetails.imageUrl}
                    alt="Profile"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>

      {showSignIn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 relative">
            <button
              onClick={closeSignIn}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            {isSignUp ? (
              <SignUp
                routing="virtual"
                redirectUrl={window.location.href}
                appearance={{
                  elements: {
                    footerActionLink: {
                      onClick: (e) => {
                        e.preventDefault();
                        toggleMode();
                      },
                    },
                    rootBox: {
                      boxShadow: "none",
                    },
                  },
                }}
                afterSignUp={(data) => {
                  handleAuthSuccess();
                  return false; // Prevent default redirect
                }}
              />
            ) : (
              <SignIn
                routing="virtual"
                redirectUrl={window.location.href}
                appearance={{
                  elements: {
                    footerActionLink: {
                      onClick: (e) => {
                        e.preventDefault();
                        toggleMode();
                      },
                    },
                    rootBox: {
                      boxShadow: "none",
                    },
                  },
                }}
                afterSignIn={(data) => {
                  handleAuthSuccess();
                  return false; // Prevent default redirect
                }}
              />
            )}
          </div>
        </div>
      )}
    </Disclosure>
  );
}
