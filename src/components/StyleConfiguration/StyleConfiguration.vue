<template>
    <n-tabs type="line" animated>
        <n-tab-pane name="style" tab="Style">
            <div class="m-3">
                <Label :text="`Transparency`" class="mb-3" />
                <n-slider
                    v-model:value="styleConfiguration.transparency"
                    :min="minOpacity"
                    :step="1"
                    :max="maxOpacity"
                />
                <BRow>
                    <BCol>{{ minOpacity }}</BCol>
                    <BCol class="text-center">{{ styleConfiguration.transparency }}</BCol>
                    <BCol class="text-end">{{ maxOpacity }}</BCol>
                </BRow>
            </div>
            <div class="m-3">
                <Label :text="`Font size`" class="mb-3" />
                <n-slider v-model:value="styleConfiguration.fontSize" :min="minFont" :step="1" :max="maxFont" />
                <BRow>
                    <BCol>{{ minFont }}</BCol>
                    <BCol class="text-center">{{ styleConfiguration.fontSize }}</BCol>
                    <BCol class="text-end">{{ maxFont }}</BCol>
                </BRow>
            </div>
            <div class="m-3">
                <Label :text="`Background color`" class="mb-3" />
                <n-color-picker v-model:value="styleConfiguration.color" :modes="['hex']" />
            </div>
        </n-tab-pane>
        <n-tab-pane name="tools" tab="Tools">
            <slot name="customTabs"></slot>
        </n-tab-pane>
    </n-tabs>
</template>

<script lang="ts">
import { NColorPicker, NSlider, NTabPane, NTabs } from 'naive-ui';
import type { IStyleConfiguration } from '../../models/StyleConfiguration/IStyleConfiguration';

export interface IStyleConfigurationData {
    maxOpacity: number;
    minOpacity: number;
    maxFont: number;
    minFont: number;
}

export default {
    components: {
        NColorPicker,
        NTabPane,
        NTabs,
        NSlider,
    },
    props: {
        styleConfiguration: {
            type: Object as () => Partial<IStyleConfiguration>,
            required: true,
        },
    },
    data(): IStyleConfigurationData {
        return {
            maxFont: 24,
            minFont: 12,
            maxOpacity: 100,
            minOpacity: 30,
        };
    },
    computed: {
        style(): string {
            console.log(this.$slots.header);

            return '';
        },
    },
};
</script>

<style lang="scss">
.nav-tab-style-configuration {
    display: none !important;
}

.configuration {
    &__colorpicker {
        z-index: 9999 !important;
    }
}
</style>
