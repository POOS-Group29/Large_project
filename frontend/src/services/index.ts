import createAPI from "@xhoantran/common";

export const API = createAPI({
  prefixUrl: "http://localhost:8080/api",
  getAuthToken: () => localStorage.getItem("token") || "",
});
