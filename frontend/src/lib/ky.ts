import createAPI from "@xhoantran/common";
import { ROUTES } from "../config/routes";
import { useAuthStore } from "./zustand";

export const API = createAPI({
  environment: import.meta.env.VITE_ENVIRONMENT,
  prefixUrl: import.meta.env.VITE_API_BASE_URL,
  getAuthToken: () => {
    const token = useAuthStore.getState().token;

    if (token) {
      return token;
    }

    window.location.href = ROUTES.SIGN_IN;
    return "";
  },
});
