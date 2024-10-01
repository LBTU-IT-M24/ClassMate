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
    <Editor class="mb-3" v-model="value" :placeholder="`Write your notes here...`" editorStyle="height: 300px" />
    <button class="btn btn-success">Save</button>
</template>

<style scoped lang="scss"></style>
