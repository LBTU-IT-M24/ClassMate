<template>
    <BaseWidgetDraggable
        :title="`Clock`"
        :type="ComponentTypes.ANALOG_CLOCK"
        @update:width="handleWidthUpdate"
    style="min-width: 310px"
    @update-position="$emit('update-position')"
    >1
    <template #widget>
        <div class="clock-container" style=" display: flex; justify-content: center; align-items: center;">
            <div @click="isEnchancedModalOpen = true">
                <Clock :clockSize="widgetWidth" />
            </div>
        </div>
        <n-modal v-model:show="isEnchancedModalOpen">
            <Clock :clockSize="clockFullSize" :showLabel="false" />
        </n-modal>
    </template>
    </BaseWidgetDraggable>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ComponentTypes } from '@/enums/ComponentTypes';
import Clock from './Clock.vue';
import { NModal } from 'naive-ui';

const widgetWidth = ref(300);


const handleWidthUpdate = (newWidth: number) => {
    widgetWidth.value = newWidth;
};



const isEnchancedModalOpen = ref(false);
const clockFullSize = window.innerHeight;
</script>

<style scoped></style>
