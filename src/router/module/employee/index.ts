import type { RouteRecordRaw } from "vue-router";
import employes from "./employes";

const employee: RouteRecordRaw = {
  path: "/employes",
  component: () => import("src/pages/employee/Layout.vue"),
  children: [...employes],
};

export default employee;
