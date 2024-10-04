<template>
    <BTabs class="configuration" :nav-class="{ 'nav-tab-style-configuration': !$slots.customTabs }">
        <BTab title="Style">
            <div class="m-3">
                <Label :text="`Transparency`" class="mb-3" />
                <Slider
                    v-model="styleConfiguration.transparency"
                    :min="minOpacity"
                    :step="1"
                    :max="maxOpacity"
                    class="w-full"
                />
                <BRow>
                    <BCol>{{ minOpacity }}</BCol>
                    <BCol class="text-center">{{ styleConfiguration.transparency }}</BCol>
                    <BCol class="text-end">{{ maxOpacity }}</BCol>
                </BRow>
            </div>
            <div class="m-3">
                <Label :text="`Font size`" class="mb-3" />
                <Slider v-model="styleConfiguration.fontSize" :min="minFont" :step="1" :max="maxFont" class="w-full" />
                <BRow>
                    <BCol>{{ minFont }}</BCol>
                    <BCol class="text-center">{{ styleConfiguration.fontSize }}</BCol>
                    <BCol class="text-end">{{ maxFont }}</BCol>
                </BRow>
            </div>

            <div class="m-3">
                <Label :text="`Background color`" class="mb-3" />
                <ColorPicker v-model="styleConfiguration.color" panelClass="configuration__colorpicker" />
            </div>
        </BTab>
        <slot name="customTabs"></slot>
    </BTabs>
</template>

<script lang="ts">
import ColorPicker from 'primevue/colorpicker';
import Slider from 'primevue/slider';
import type { IStyleConfiguration } from '../../models/StyleConfiguration/IStyleConfiguration';

export interface IStyleConfigurationData {
    maxOpacity: number;
    minOpacity: number;
    maxFont: number;
    minFont: number;
}

export default {
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
