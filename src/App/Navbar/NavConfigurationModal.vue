<template>
    <BModal
        :modelValue="showOptions"
        :okOnly="true"
        :okTitle="`Save`"
        @ok="saveSettings"
        class="dialog-content"
        :title="`Workspace Settings`"
    >
        <BFormCheckbox v-model="analogClock" switch> Analog Clock </BFormCheckbox>
        <BFormCheckbox v-model="timer" switch> Timer & Stopwatch </BFormCheckbox>
        <BFormCheckbox v-model="lessons" switch> Lessons </BFormCheckbox>
        <BFormCheckbox v-model="notes" switch> Notes </BFormCheckbox>
        <BFormCheckbox v-model="playlist" switch> Playlist </BFormCheckbox>
        <BFormCheckbox v-model="bookmarks" switch> Bookmarks </BFormCheckbox>
        <BFormCheckbox v-model="titleBar" switch> Title Bar </BFormCheckbox>
    </BModal>
</template>

<script lang="ts">
import { ComponentTypes } from '@/enums/ComponentTypes';
import { BModal } from 'bootstrap-vue-next';

export default {
    name: 'NavConfigurationModal',
    components: {
        BModal,
    },
    props: {
        showOptions: {
            type: Boolean,
            required: true,
        },
        widgetVisibility: {
            type: Map,
            required: true,
        },
    },
    data() {
        return {
            localWidgetVisibility: new Map(this.widgetVisibility),
        };
    },
    watch: {
        widgetVisibility(newVal: Map<string, boolean>) {
            this.localWidgetVisibility = new Map(newVal);
        },
    },
    computed: {
        analogClock: {
            get() {
                return this.localWidgetVisibility.get(ComponentTypes.ANALOG_CLOCK);
            },
            set(value: boolean) {
                this.localWidgetVisibility.set(ComponentTypes.ANALOG_CLOCK, value);
            },
        },
        timer: {
            get() {
                return this.localWidgetVisibility.get(ComponentTypes.TIMER);
            },
            set(value: boolean) {
                this.localWidgetVisibility.set(ComponentTypes.TIMER, value);
            },
        },
        lessons: {
            get() {
                return this.localWidgetVisibility.get(ComponentTypes.LESSONS);
            },
            set(value: boolean) {
                this.localWidgetVisibility.set(ComponentTypes.LESSONS, value);
            },
        },
        notes: {
            get() {
                return this.localWidgetVisibility.get(ComponentTypes.NOTES);
            },
            set(value: boolean) {
                this.localWidgetVisibility.set(ComponentTypes.NOTES, value);
            },
        },
        playlist: {
            get() {
                return this.localWidgetVisibility.get(ComponentTypes.PLAYLIST);
            },
            set(value: boolean) {
                this.localWidgetVisibility.set(ComponentTypes.PLAYLIST, value);
            },
        },
        bookmarks: {
            get() {
                return this.localWidgetVisibility.get(ComponentTypes.BOOKMARKS);
            },
            set(value: boolean) {
                this.localWidgetVisibility.set(ComponentTypes.BOOKMARKS, value);
            },
        },
        titleBar: {
            get() {
                return this.localWidgetVisibility.get(ComponentTypes.TITLE_BAR);
            },
            set(value: boolean) {
                this.localWidgetVisibility.set(ComponentTypes.TITLE_BAR, value);
            },
        },
    },
    methods: {
        saveSettings() {
            this.$emit('update:widgetVisibility', new Map(this.localWidgetVisibility));
            this.$emit('closeOptions');
        },
    },
};
</script>

<style scoped lang="scss">
ul {
    list-style-type: none;
}
</style>
