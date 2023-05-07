<script setup lang="ts">
import { useSlots, h } from "vue";
import Colspan from "./Colspan.vue";
import { PageModel } from "src/models/PageModel";

const emits = defineEmits(["click-row"]);

interface Props {
  models: PageModel<any>;
  rowclass?: ({ index, model }: { index: number; model: any }) => string;
  fixedHead?: boolean;
  fixedFoot?: boolean;
}

const props = defineProps<Props>();

const thead = "Thead";
const tfoot = "Tfoot";

function filterSlots(component) {
  const slots = useSlots();

  const defaultSlotFn = slots.default;

  if (!defaultSlotFn) {
    return [];
  }

  return defaultSlotFn().filter(({ type: { name } }) => name == component);
}

function defaultSlots() {
  const children = filterSlots("Column");

  return children
    .map((parent) => {
      const { field, header } = parent.props || {};
      const { children } = parent || {};
      const fn = children && children[field];

      if (!fn) {
        return;
      }

      return {
        field,
        header,
        fn,
        attrs: parent.props,
      };
    })
    .filter((ch) => ch);
}

//params -> Tfoot | Thead
function thf(name) {
  const slots = filterSlots(name);

  const result = [];

  const { data: models, total } = props.models;

  for (const slot of slots) {
    const { children, props } = slot || {};

    const call =
      children && (children.default || children.thead || children.tfoot);

    if (!call) {
      continue;
    }

    const vnode = call({ models, total });

    if (!vnode.length) {
      continue;
    }

    if (vnode[0].type != "td") {
      const c = h(
        Colspan,
        { ...props },
        {
          default: () => vnode,
        }
      );
      result.push(c);
    } else {
      const c = h(
        "tr",
        { ...props },
        {
          default: () => vnode,
        }
      );
      result.push(c);
    }
  }

  return result;
}
</script>

<template>
  <q-markup-table separator="cell" flat bordered square fixed>
    <thead>
      <component v-for="(el, i) of thf(thead)" :is="el" :key="i" />
      <tr>
        <td
          v-for="({ header }, index) of defaultSlots()"
          :key="index"
          class="text-center th"
        >
          {{ header }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(model, index) of props.models.data"
        :key="index"
        :class="props?.rowclass && props.rowclass({ model, index })"
        @click="emits('click-row', { model, index })"
      >
        <component
          class="text-center"
          v-for="({ fn, attrs }, i) of defaultSlots()"
          :key="i"
          :is="h('td', { ...attrs }, fn({ model, index }))"
        />
      </tr>
    </tbody>
    <tfoot>
      <component v-for="(el, i) of thf(tfoot)" :is="el" :key="i" />
    </tfoot>
  </q-markup-table>
</template>

<style lang="scss">
.q-table--bordered,
.q-table thead,
.q-table tr,
.q-table th,
.q-table td {
  border-width: 1px;
}

tr {
  .th {
    font-size: 1.4rem;
    font-weight: 600;
  }

  td {
    font-size: 1.2rem;
    font-weight: 400;
  }
}
</style>
