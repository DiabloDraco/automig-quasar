<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const emits = defineEmits(["changePerPage"]);

const perPage = ref(5);
const router = useRouter();
const route = useRoute();

async function changePerPage(value: number) {
  const { query } = route;

  await router.push({
    query: {
      ...query,
      perpage: value,
    },
  });

  emits("changePerPage", value);
}
</script>

<template>
  <q-select
    v-model="perPage"
    outlined
    dense
    :options="[5, 15, 25]"
    display-value="На страницу"
    @update:model-value="changePerPage"
  />
</template>
