<template>
  <q-markup-table separator="cell" flat bordered square fixed>
    <thead>
      <tr>
        <th colspan="99" class="bg-transparent">
          <div class="flex items-center gap">
            <q-skeleton width="200px" height="30px" square animation="fade" />
            <q-space />
            <q-skeleton width="120px" height="30px" square animation="fade" />
            <q-skeleton width="120px" height="30px" square animation="fade" />
            <q-skeleton width="120px" height="30px" square animation="fade" />
          </div>
        </th>
      </tr>
      <tr>
        <th class="text-center">
          <q-skeleton animation="blink" width="100px" type="text" />
        </th>
        <th class="text-center">
          <q-skeleton animation="blink" width="100px" type="text" />
        </th>
        <th class="text-center">
          <q-skeleton animation="blink" width="100px" type="text" />
        </th>
        <th class="text-center">
          <q-skeleton animation="blink" width="100px" type="text" />
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="n in 5" :key="n">
        <td class="text-center">
          <q-skeleton animation="blink" type="text" width="85px" />
        </td>
        <td class="text-center">
          <q-skeleton animation="blink" type="text" width="50px" />
        </td>
        <td class="text-center">
          <q-skeleton animation="blink" type="text" width="35px" />
        </td>
        <td class="text-center">
          <q-skeleton animation="blink" type="text" width="35px" />
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th colspan="99">
          <div class="flex flex-center">
            <q-skeleton width="500px" />
          </div>
        </th>
      </tr>
    </tfoot>
  </q-markup-table>
</template>

<style scoped>
.gap {
  column-gap: 1rem;
}
</style>
