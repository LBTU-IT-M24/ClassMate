<template>
    <div class="widget">
        <h4>{{ title }}</h4>
        <slot></slot>
    </div>
</template>

<script lang="ts">
interface IWidgetWrapperData {}

export default {
    props: {
        title: {
            type: String,
        },
    },
    data(): IWidgetWrapperData {
        return {};
    },
};
</script>

<style scoped lang="scss">
.widget {
    border-radius: var(--bs-border-radius) !important;
    --bs-bg-opacity: 1;
    background-color: rgba(var(--bs-light-rgb), var(--bs-bg-opacity)) !important;
    box-shadow: var(--bs-box-shadow) !important;
    display: flex !important;
    flex-direction: column;
    margin: 0px auto;
    padding: 1rem;
    height: 500px;
    overflow: auto;
}
</style>
