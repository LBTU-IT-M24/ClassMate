<template>
  {{ text }}
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "BrainstormBoard",
  data() {
    return {
      text: "BrainstormBoard",
    }
  },
})
</script>

<style scoped>

</style>
