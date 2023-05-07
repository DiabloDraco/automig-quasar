import { RouteRecordRaw } from "vue-router";

const users: RouteRecordRaw[] = [
  {
    path: "",
    component: () => import("pages/user/users/Page.vue"),
    meta: {
      group: "users",
    },
  },
  {
    path: "create",
    component: () => import("pages/user/users/Create.vue"),
    meta: {
      group: "users",
    },
  },
  {
    path: "edit/:id",
    props: true,
    component: () => import("pages/user/users/Edit.vue"),
    meta: {
      group: "users",
    },
  },
];

export default users;
