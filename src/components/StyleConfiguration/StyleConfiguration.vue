<template>
    <n-tabs type="line" animated :tab-style="{ display: !$slots.customTabs ? 'none' : 'block' }">
        <n-tab-pane name="style" tab="Style">
            <div class="m-3" v-if="!disabledOptions.isOpacityDisabled">
                <Label :text="`Transparency`" class="mb-3" />
                <n-slider
                    v-model:value="styleConfiguration.transparency"
                    :min="minOpacity"
                    :step="1"
                    :max="maxOpacity"
                    :tooltip="false"
                />
                <n-flex justify="space-between">
                    <span>{{ minOpacity }}</span>
                    <span> {{ styleConfiguration.transparency }}</span>
                    <span>{{ maxOpacity }}</span>
                </n-flex>
            </div>
            <div class="m-3" v-if="!disabledOptions.isFontSizeDisabled">
                <Label :text="`Font size`" class="mb-3" />
                <n-slider
                    v-model:value="styleConfiguration.fontSize"
                    :min="minFont"
                    :step="1"
                    :max="maxFont"
                    :tooltip="false"
                />
                <n-flex justify="space-between">
                    <span>{{ minFont }}</span>
                    <span>{{ styleConfiguration.fontSize }}</span>
                    <span>{{ maxFont }}</span>
                </n-flex>
            </div>
            <div class="m-3" v-if="!disabledOptions.isBackgroundColorDisabled">
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
import { NColorPicker, NSlider, NTabPane, NTabs, NFlex } from 'naive-ui';
import type { IStyleConfiguration } from '../../models/StyleConfiguration/IStyleConfiguration';
import { inject } from 'vue';

export interface IStyleConfigurationData {
    maxOpacity: number;
    minOpacity: number;
    maxFont: number;
    minFont: number;
}

export interface IStyleToolConfigurationModel {
    isOpacityDisabled: boolean;
    isFontSizeDisabled: boolean;
    isBackgroundColorDisabled: boolean;
}

export default {
    components: {
        NColorPicker,
        NTabPane,
        NTabs,
        NSlider,
        NFlex,
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
    setup() {
        const disabledOptions = inject('disabledOptions', {
            isOpacityDisabled: false,
            isFontSizeDisabled: false,
            isBackgroundColorDisabled: false,
        });

        return {
            disabledOptions,
        };
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
