<script setup lang="ts">
import { RouteLocationRaw } from "vue-router";

export interface BreadcrumbEl {
  label: string;
  to?: RouteLocationRaw;
  icon?: string;
}

export interface Props {
  breadcrumbs: BreadcrumbEl[];
}

const { breadcrumbs } = defineProps<Props>();
</script>

<template>
  <q-breadcrumbs>
    <q-breadcrumbs-el
      v-for="(crumb, i) of breadcrumbs"
      v-bind="crumb"
      :key="i"
    />
  </q-breadcrumbs>
</template>
