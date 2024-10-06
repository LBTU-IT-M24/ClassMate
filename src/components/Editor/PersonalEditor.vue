<script lang="ts">
import { ComponentTypes } from '@/enums/ComponentTypes';

export interface IPersonalEditorData {
    value: string; // Note - this is an HTML value. For example text - woo, will be translated to <p>woo</p>
}

export default {
    computed: {
        ComponentTypes() {
            return ComponentTypes;
        },
    },
    data(): IPersonalEditorData {
        return {
            value: '',
        };
    },
};
</script>

<template>
    <BaseWidgetDraggable :title="`Notes`" :type="ComponentTypes.NOTES" @update-position="$emit('update-position')">
        <template v-slot:widget>
            <Editor class="mb-3" v-model="value" editorStyle="height: 300px" />
        </template>
    </BaseWidgetDraggable>
</template>

<style scoped lang="scss"></style>
