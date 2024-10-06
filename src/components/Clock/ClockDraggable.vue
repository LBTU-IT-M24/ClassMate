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
                <n-card :style="cardWidth" size="huge" content-style="align-self: center">
                    <Clock :clockSize="clockFullSize" :showLabel="false" />
                </n-card>
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
            clockFullSize: window.innerHeight * 0.9,
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
        cardWidth() {
            return {
                width: this.clockFullSize * 1.25 + 'px',
            };
        },
    },
});
</script>

<style scoped></style>
