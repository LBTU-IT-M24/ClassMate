<script lang="ts">
interface IPersonalEditorData {
    value: string; // Note - this is an HTML value. For example text - woo, will be translated to <p>woo</p>
}

export default {
    data(): IPersonalEditorData {
        return {
            value: '',
        };
    },
};
</script>

<template>
    <Editor v-model="value" editorStyle="height: 320px" />
</template>

<style scoped lang="scss"></style>
