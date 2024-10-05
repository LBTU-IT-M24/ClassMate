<script lang="ts">
export interface IPersonalEditorData {
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
    <BaseWidgetDraggable :title="`Notes`">
        <template v-slot:widget>
            <Editor
                class="mb-3"
                v-model="value"
                :placeholder="`Write your notes here...`"
                editorStyle="height: 300px"
            />
        </template>
    </BaseWidgetDraggable>
</template>

<style scoped lang="scss"></style>
