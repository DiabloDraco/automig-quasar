import { RouteRecordRaw } from "vue-router";

const employes: RouteRecordRaw[] = [
  {
    path: "",
    component: () => import("pages/employee/employes/Page.vue"),
    meta: {
      group: "employes",
    },
  },
  {
    path: "create",
    component: () => import("pages/employee/employes/Create.vue"),
    meta: {
      group: "employes",
    },
  },
  {
    path: "edit/:id",
    props: true,
    component: () => import("pages/employee/employes/Edit.vue"),
    meta: {
      group: "employes",
    },
  },
];

export default employes;
