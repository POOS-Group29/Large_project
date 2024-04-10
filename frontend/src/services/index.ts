import createAPI from "@xhoantran/common";
export const API = createAPI({
  environment: import.meta.env.VITE_ENVIRONMENT,
  prefixUrl: import.meta.env.VITE_API_BASE_URL,
  getAuthToken: () => localStorage.getItem("token") || "",
});
