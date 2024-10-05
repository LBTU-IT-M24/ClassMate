<template>
    <BaseWidgetDraggable :title="`Timer`" :type="ComponentTypes.TIMER" @update-position="$emit('update-position')">
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
import { ComponentTypes } from '@/enums/ComponentTypes';

export default {
    computed: {
        ComponentTypes() {
            return ComponentTypes;
        },
    },
};
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
