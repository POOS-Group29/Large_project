import getCommonAPI from "@xhoantran/common";
import ky from "ky";

export const CommonAPI = getCommonAPI({
  prefixUrl: import.meta.env.VITE_API_BASE_URL || "",
  getAuthToken: () => localStorage.getItem("token") || "",
});

export const baseInstance = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Environment: import.meta.env.VITE_ENVIRONMENT,
  },
});

export const authInstance = baseInstance.extend({
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = localStorage.getItem("token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});
