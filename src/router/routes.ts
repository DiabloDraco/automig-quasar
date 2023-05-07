import { RouteRecordRaw } from "vue-router";
import user from "./module/user";
import employee from "./module/employee";

const routes: RouteRecordRaw[] = [
  user,
  employee,
  {
    path: "/login",
    component: () => import("pages/Login.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
