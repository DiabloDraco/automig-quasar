<script setup lang="ts">
import { useRoute } from "vue-router";
import EmployeeService from "src/services/EmployeeService";
const route = useRoute();

const { id } = route.params;
async function getUser(id: number) {
  return await EmployeeService.findByID(id);
}
const user = await getUser(+id);
</script>

<template>
  <q-page class="row q-pa-xl">
    <q-form>
      <Input color="positive" class="q-my-md" />
      <Input class="col-5 offset-1" :label="user.surname" />
    </q-form>
  </q-page>
</template>

<style></style>
