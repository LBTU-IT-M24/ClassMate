<template>
    <BaseWidgetDraggable :title="`Lessons`" :type="ComponentTypes.LESSONS" @update-position="$emit('update-position')">
        <template v-slot:widget>
            <ul class="list-unstyled">
                <li>Lesson 1</li>
                <li>Lesson 2</li>
                <li>Lesson 3</li>
                <li>Lesson 4</li>
            </ul>
        </template>
    </BaseWidgetDraggable>
</template>

<script lang="ts">
import { ComponentTypes } from '@/enums/ComponentTypes';

export default {
    computed: {
        ComponentTypes() {
            return ComponentTypes;
        },
    },
};
</script>

<style scoped lang="scss"></style>
