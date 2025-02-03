import { useEffect } from "react";
import { signOut } from "next-auth/react";

// Custom hook to synchronize logout across tabs
const useSyncLogout = () => {
  useEffect(() => {
    const onStorageChange = (event) => {
      // Check if the logout event was triggered by other tabs or windows
      if (event.key === "keycloak-session-logout") {
        signOut({ redirect: false }); // Log out the user in the current tab
      }
    };

    // Listen for storage changes in all open tabs/windows
    window.addEventListener("storage", onStorageChange);

    return () => {
      window.removeEventListener("storage", onStorageChange); // Clean up listener
    };
  }, []);
};

export default useSyncLogout;
