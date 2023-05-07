<script lang="ts">
export default {
  props: {
    header: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    rowclass: {
      type: String,
    },
  },
  name: "Column",
  render: () => null,
};
</script>
