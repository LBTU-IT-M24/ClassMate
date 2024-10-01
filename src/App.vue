<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue';
import SwitchableTimer from '@/components/Timer/SwitchableTimer.vue';
import Clock from '@/components/Clock/Clock.vue';
import NavConfigurationModal from './App/Navbar/NavConfigurationModal.vue';
import { ComponentTypes } from './enums/ComponentTypes';
import { BCol, BRow } from 'bootstrap-vue-next';
import WidgetWrapper from './components/Widget/WidgetWrapper.vue';
import Bookmarks from './components/Bookmark/Bookmarks.vue';
import Lessons from './components/Lesson/Lessons.vue';
import Playlist from './components/Playlist/Playlist.vue';
import PersonalEditor from './components/Editor/PersonalEditor.vue';
import RoleSelect from './components/Role/RoleSelect.vue';

const userType = ref('');
const userTypeChosen = ref(false);
const showOptions = ref(false);
const widgetVisibility = ref(new Map<ComponentTypes, boolean>([[ComponentTypes.TIMER, true]]));

const componentDefinitions = shallowRef([
    {
        renderer: Clock,
        propsData: {
            timeFormat: '24hour',
            hourFormat: 'standard',
            outerFont: 0.2,
            innerFont: 0.1,
        },
        customData: {
            style: 'min-width: 330px',
            title: 'Analog Clock',
        },
        type: ComponentTypes.ANALOG_CLOCK,
    },
    {
        renderer: SwitchableTimer,
        customData: {
            style: 'min-width: 330px',
            title: 'Timer/Stopwatch',
        },
        type: ComponentTypes.TIMER,
    },
    {
        renderer: Bookmarks,
        customData: {
            title: 'Bookmarks',
        },
        type: ComponentTypes.BOOKMARKS,
    },
    {
        renderer: Lessons,
        customData: {
            title: 'Lessons',
        },
        type: ComponentTypes.LESSONS,
    },
    {
        renderer: PersonalEditor,
        customData: {
            title: 'Notes',
        },
        type: ComponentTypes.NOTES,
    },
    {
        renderer: Playlist,
        customData: {
            title: 'Playlist',
        },
        type: ComponentTypes.PLAYLIST,
    },
]);

const chosenWidgets = computed(() =>
    componentDefinitions.value.filter((item) => widgetVisibility.value.get(item.type)),
);

const chooseUserType = (type: string) => {
    userType.value = type;
    userTypeChosen.value = true;
};

const updateWidgetVisibility = (newVisibility: Map<ComponentTypes, boolean>) => {
    widgetVisibility.value = newVisibility;
};
</script>

<template>
    <header v-if="userTypeChosen" class="bg-light">
        <div class="container d-flex justify-content-between align-items-center">
            <div class="user-type">
                <h5 v-if="userType" class="mb-0">{{ userType }}</h5>
            </div>
            <nav class="navbar navbar-expand-lg navbar-light">
                <button class="btn btn-outline-secondary" @click="showOptions = !showOptions">Options</button>
            </nav>
        </div>
        <NavConfigurationModal
            :showOptions="showOptions"
            :widgetVisibility="widgetVisibility"
            @update:widgetVisibility="updateWidgetVisibility"
            @closeOptions="showOptions = false"
        />
    </header>
    <main class="container-fluid d-flex justify-content-center bg-page">
        <RoleSelect @userTypeChosen="chooseUserType" v-if="!userTypeChosen" />
        <div class="w-100 p-4" v-else>
            <BRow>
                <BCol
                    v-for="(item, index) in chosenWidgets"
                    class="mb-4 col-xl-4 col-lg-6 col-12"
                    :key="index"
                    :style="item.customData.style"
                >
                    <WidgetWrapper :title="item.customData.title">
                        <component :is="item.renderer" v-bind="item.propsData" />
                    </WidgetWrapper>
                </BCol>
            </BRow>
        </div>

        <div class="overlay"></div>
    </main>
</template>

<style scoped>
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
}
.bg-page {
    background-image: url('@/assets/main_bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: repeat;
}
</style>
