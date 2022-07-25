import { RouteLocationNormalized, NavigationGuardNext } from "vue-router"
import User from "../models/User";
const user = new User();

export const authenticated = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if(await user.verifyToken()) return next();
  next({ name: "login" });
}

export const unauthenticated = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if(!await user.verifyToken()) return next();
  next({ name: "users" });
}