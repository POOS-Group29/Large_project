import ky from "ky";
import authServices from "./services/auth";
import locationServices from "./services/location";
import ratingServices from "./services/rating";

interface ICommonAPI {
  prefixUrl: string;
  getAuthToken: () => string;
  environment?: string;
}

export default (props: ICommonAPI) => {
  const { prefixUrl, getAuthToken, environment } = props;

  const instance = ky.extend({
    prefixUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Environment: environment || "prod",
    },
  });

  const authenticatedInstance = instance.extend({
    hooks: {
      beforeRequest: [
        (request) => {
          const token = getAuthToken();
          if (!token) {
            throw new Error("Token is not available");
          }
          request.headers.set("Authorization", `Bearer ${token}`);
        },
      ],
    },
  });

  return {
    auth: authServices(instance, authenticatedInstance),
    location: locationServices(authenticatedInstance),
    rating: ratingServices(authenticatedInstance),
  };
};

export type { LocationSchemaType } from "./schemas/location";
