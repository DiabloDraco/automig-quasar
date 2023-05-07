<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

export interface Props {
  total: number;
}

const emits = defineEmits(["changePage"]);
const router = useRouter();
const route = useRoute();

const props = defineProps<Props>();

const { page, perpage } = route.query;

//@ts-ignore
const paggin = ref(page & +page || 1);

async function changePage(pageCount: number) {
  const { query } = route;

  await router.push({
    query: {
      ...query,
      page: pageCount,
    },
  });

  emits("changePage", pageCount);
}

function ceil() {
  //@ts-ignore
  let value = +perpage;

  if (isNaN(value)) {
    value = 5;
  }

  return Math.ceil(props.total / value);
}
</script>

<template>
  <q-pagination
    size="1rem"
    v-model="paggin"
    @update:model-value="changePage"
    :max="ceil()"
    max-pages="5"
    direction-links
    boundary-links
  />
</template>
