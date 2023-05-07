<script setup lang="ts">
import { PageModel } from "src/models/PageModel";
import { Table, Tables } from "src/models/TableModel";
import EmployeeService from "src/services/EmployeeService";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { Employee } from "../../../../src-ssr/mock/entity/Employee";

type EmployeeType = Table<Employee>;

const router = useRouter();
const route = useRoute();

const employes = ref<PageModel<Employee>>({
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
  employes.value = await EmployeeService.page(query);
}

async function search(query: string = "") {
  employes.value = await EmployeeService.search(query);
}

find(parseQuery());
</script>

<template>
  <q-page class="q-mx-lg">
    <ContentTop class="q-gutter-x-sm">
      <Breadcrumb
        :breadcrumbs="[
          { label: 'Главная', to: '/' },
          { label: 'Пользователи', to: '/employes' },
        ]"
      />
      <q-space />
      <Button to="employes/create">Создать</Button>
    </ContentTop>

    <BaseTable :models="employes">
      <Thead
        class="flex q-gutter-x-md items-center"
        #thead="{ total, models }: Tables<Employee>"
      >
        <div class="text-bold">Количество пользователей: {{ total }}</div>
        <q-space />
        <PerPage @changePerPage="find(parseQuery())" />
        <Input label="Поиск" debounce="500" @update:model-value="search" />
        <Button @click="flushQuery()" icon="refresh" fab-mini />
      </Thead>

      <!-- #id -->
      <Column header="№" field="id" #id="{ index, model }: EmployeeType">
        {{ index + 1 }}
      </Column>
      <!-- #name -->
      <Column
        header="Имя"
        field="name"
        #name="{ model: { name } }: EmployeeType"
      >
        {{ name }}
      </Column>
      <!-- #surname -->
      <Column
        header="Фамилия"
        field="surname"
        #age="{ model: { surname } }: EmployeeType"
      >
        {{ surname }}
      </Column>
      <!-- #patronymic -->
      <Column
        header="Отчество"
        field="patronymic"
        #patronymic="{ model: { patronymic } }: EmployeeType"
      >
        {{ patronymic }}
      </Column>
      <!-- #placeBirth -->
      <Column
        header="Место рождение"
        field="placeBirth"
        #placeBirth="{ model: { placeBirth } }: EmployeeType"
      >
        {{ placeBirth }}
      </Column>
      <!-- #status -->
      <Column
        header="Статус"
        field="status"
        #status="{ model: { status } }: EmployeeType"
      >
        {{ status }}
      </Column>
      <!-- #position -->
      <Column
        header="Должность"
        field="position"
        #position="{ model: { position } }: EmployeeType"
      >
        {{ position }}
      </Column>

      <!-- #stage -->
      <Column
        header="Стаж"
        field="stage"
        #stage="{ model: { stage } }: EmployeeType"
      >
        {{ stage }}
      </Column>

      <!-- #stage -->
      <Column
        header="Гражданство"
        field="citizenship"
        #citizenship="{ model: { citizenship } }: EmployeeType"
      >
        {{ citizenship }}
      </Column>

      <!-- #birthday -->
      <Column
        header="День рождение"
        field="birthday"
        #birthday="{ model: { birthday } }: EmployeeType"
      >
        {{ birthday }}
      </Column>

      <Column
        header="Изменить"
        field="id"
        #id="{ model: { id } }: EmployeeType"
      >
        <q-btn
          color="primary"
          outline
          fab-mini
          icon="edit"
          :to="`employes/edit/${id}`"
        />
      </Column>
      <Tfoot #tfoot="{ models, total }: Tables<Employee>">
        <td colspan="2"></td>
        <td class="text-center">
          Средний id:
          <span class="text-bold">
            {{
              Math.round(
                models.map((u) => u.id).reduce((p, c) => (p += c), 0) /
                  models.length
              )
            }}
          </span>
        </td>
      </Tfoot>
      <Tfoot class="flex flex-center" #tfoot="{ total }: Tables<Employee>">
        <Pagination :total="total" @changePage="find(parseQuery())" />
      </Tfoot>
    </BaseTable>
  </q-page>
</template>
