<template>
    <div class="label">
        <label class="label__custom">
            {{ text }}
        </label>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        text: {
            type: String,
        },
    },
};
</script>

<style scoped lang="scss">
.label {
    &__custom {
        font-weight: 700;
    }
}
</style>
