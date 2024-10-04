<template>
    <BaseWidgetDraggable :title="`Timer`">
        <template v-slot:widget>
            <BTabs class="switchable-timer">
                <BTab title="Timer">
                    <div class="switchable-timer__item">
                        <Timer />
                    </div>
                </BTab>
                <BTab title="Stopwatch">
                    <div class="switchable-timer__item">
                        <Stopwatch />
                    </div>
                </BTab>
            </BTabs>
        </template>
    </BaseWidgetDraggable>
</template>

<script lang="ts">
import BaseWidgetDraggable from '../Draggable/BaseWidgetDraggable.vue';

export default {};
</script>

<style scoped lang="scss">
.switchable-timer {
    min-height: 400px;
    min-width: 300px;

    &__item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>
