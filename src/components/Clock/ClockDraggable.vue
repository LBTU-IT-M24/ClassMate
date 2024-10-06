<template>
    <BaseWidgetDraggable
        :title="`Clock`"
        :initial-position="initialPosition"
        :type="ComponentTypes.ANALOG_CLOCK"
        @update-position="$emit('update-position')"
    >
        <template #widget>
            <div @click="isEnchancedModalOpen = true">
                <Clock />
            </div>
            <n-modal v-model:show="isEnchancedModalOpen">
                <Clock :clockSize="clockFullSize" :showLabel="false" />
            </n-modal>
        </template>
    </BaseWidgetDraggable>
</template>

<script lang="ts">
import { ComponentTypes } from '@/enums/ComponentTypes';
import { defineComponent } from 'vue';
import Clock from './Clock.vue';
import { NModal, NCard } from 'naive-ui';

export interface IClockDraggable {
    isEnchancedModalOpen: boolean;
}

export default defineComponent({
    name: 'ClockDraggable',
    components: {
        Clock,
        NModal,
        NCard,
    },
    data() {
        return {
            isEnchancedModalOpen: false,
            clockFullSize: window.innerHeight,
        };
    },
    props: {
        initialPosition: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ComponentTypes() {
            return ComponentTypes;
        },
    },
});
</script>

<style scoped></style>
