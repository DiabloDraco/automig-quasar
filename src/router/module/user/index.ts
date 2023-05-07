import type { RouteRecordRaw } from "vue-router";
import users from "./users";

const user: RouteRecordRaw = {
  path: "/users",
  component: () => import("src/pages/user/Layout.vue"),
  children: [...users],
};

export default user;
