<script setup lang="ts">
import Layout, { Item } from "src/layouts/Layout.vue";

const links: Item[] = [
  {
    text: "Работники",
    icon: "group", //https://fonts.google.com/icons
    to: "/employes",
    activeFn: (group) => group == "employes",
  },
];
</script>

<template>
  <Layout title="MyDream" :links="links">
    <template #header></template>
  </Layout>
</template>
