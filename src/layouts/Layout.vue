<template>
  <q-layout view="hHh lpR fFf" class="text-subtitle1 text-bold">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> {{ title }} </q-toolbar-title>
        <slot name="header" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="drawer" side="left" bordered>
      <q-list bordered class="text-primary">
        <q-item
          exact
          active-class="active__link"
          v-for="({ text, icon, to, activeFn }, i) of links"
          :key="i"
          :active="activeFn(route.meta.group)"
          :to="to"
        >
          <q-item-section avatar>
            <q-icon :name="icon" />
          </q-item-section>
          <q-item-section>{{ text }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouteLocationRaw, useRoute } from "vue-router";

export interface Item {
  icon: string;
  text: string;
  to: RouteLocationRaw;
  activeFn: (group: string) => boolean;
}

export interface Props {
  title: string;
  links: Item[];
}

const { title, links } = defineProps<Props>();

const route = useRoute();

const drawer = ref(true);

function toggleLeftDrawer() {
  drawer.value = !drawer.value;
}
</script>

<style scoped lang="scss">
.active__link {
  color: white;
  background: $active-link;
}
</style>
