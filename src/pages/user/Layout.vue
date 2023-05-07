<script setup lang="ts">
import Layout, { Item } from "src/layouts/Layout.vue";

const links: Item[] = [
  {
    text: "Пользователи",
    icon: "group", //https://fonts.google.com/icons
    to: "/users",
    activeFn: (group) => group == "users",
  },
];
</script>

<template>
  <Layout title="MyDream" :links="links">
    <template #header> </template>
  </Layout>
</template>
