<script setup lang="ts">
import { PageModel } from "src/models/PageModel";
import { Table, Tables } from "src/models/TableModel";
import { User } from "src/models/User";
import UserService from "src/services/UserService";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

type UserType = Table<User>;

const router = useRouter();
const route = useRoute();

const users = ref<PageModel<User>>({
  data: [],
  total: 0,
});

function parseQuery() {
  return Object.keys(route.query)
    .map((key) => `${key}=${route.query[key]}`)
    .join("&");
}

async function flushQuery() {
  await router.push({
    query: {},
  });

  await find();
}

async function find(query: string = "") {
  users.value = await UserService.page(query);
}

async function search(query: string = "") {
  users.value = await UserService.search(query);
}

find(parseQuery());
</script>

<template>
  <q-page class="q-mx-lg">
    <ContentTop class="q-gutter-x-sm">
      <Breadcrumb
        :breadcrumbs="[{ label: 'Главная' }, { label: 'Пользователи' }]"
      />
      <q-space />
      <Button>Создать</Button>
    </ContentTop>

    <BaseTable :models="users">
      <Thead
        class="flex q-gutter-x-md items-center"
        #thead="{ total, models }: Tables<User>"
      >
        <div class="text-bold">Количество пользователей: {{ total }}</div>
        <q-space />
        <PerPage @changePerPage="find(parseQuery())" />
        <Input label="Поиск" debounce="500" @update:model-value="search" />
        <Button @click="flushQuery()" icon="refresh" fab-mini />
      </Thead>

      <!-- #id -->
      <Column header="№" field="id" #id="{ index, model }: Table<User>">
        {{ index + 1 }}
      </Column>
      <!-- #name -->
      <Column
        header="Имя"
        field="name"
        #name="{ model: { name } }: Table<User>"
      >
        {{ name }}
      </Column>
      <!-- #age -->
      <Column
        header="Возраст"
        field="age"
        #age="{ model: { age } }: Table<User>"
      >
        {{ age }}
      </Column>
      <!-- #salary -->
      <Column
        header="Зарплата"
        field="salary"
        #salary="{ model: { salary } }: Table<User>"
      >
        {{ salary }}
      </Column>
      <Tfoot #tfoot="{ models, total }: Tables<User>">
        <td colspan="2"></td>
        <td class="text-center">
          Средний возраст:
          <span class="text-bold">
            {{
              Math.round(
                models.map((u) => u.age).reduce((p, c) => (p += c), 0) /
                  models.length
              )
            }}
          </span>
        </td>
        <td class="text-center">
          Сумма всех зарплат:
          <span class="text-bold">
            {{ models.map((u) => u.salary).reduce((p, c) => (p += c), 0) }}
          </span>
        </td>
      </Tfoot>
      <Tfoot class="flex flex-center" #tfoot="{ total }: Tables<User>">
        <Pagination :total="total" @changePage="find(parseQuery())" />
      </Tfoot>
    </BaseTable>
  </q-page>
</template>
