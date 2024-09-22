<script lang="ts">
interface IExampleModalProps {
    isOpen: boolean;
}

export default {
    data(): IExampleModalProps {
        return {
            isOpen: false,
        };
    },
};
</script>

<template>
    <div style="padding: 2rem">
        <h5>Toggle currently selected components</h5>
        <BButton @click="isOpen = !isOpen"> Toggle components </BButton>
    </div>

    <BModal id="example-modal" scrollable v-model="isOpen" title="Used components" :okOnly="true">
        <ExampleModalBody />
    </BModal>
</template>

<style scoped></style>
