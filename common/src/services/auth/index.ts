import type { KyInstance } from "ky";
import _fetchProfile from "./fetchProfile";
import _forgotPassword from "./forgotPassword";
import _signIn from "./signIn";
import _signUp from "./signUp";

export default (instance: KyInstance, authenticatedInstance: KyInstance) => ({
  signUp: _signUp(instance),
  signIn: _signIn(instance),
  fetchProfile: _fetchProfile(authenticatedInstance),
  forgotPassword: _forgotPassword(instance),
});
