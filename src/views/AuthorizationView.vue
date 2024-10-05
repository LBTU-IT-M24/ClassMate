<template>
  <RoleSelect />
</template>

<script lang="ts">
import {defineComponent} from "vue";
import RoleSelect from "@/components/Role/RoleSelect.vue";

export default defineComponent({
  name: "AuthorizationView",
  components: {RoleSelect},
})
</script>

<style scoped>

</style>
