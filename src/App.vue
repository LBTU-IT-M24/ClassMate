<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue';
import NavConfigurationModal from './App/Navbar/NavConfigurationModal.vue';
import { ComponentTypes } from './enums/ComponentTypes';
import Bookmarks from './components/Bookmark/Bookmarks.vue';
import RoleSelect from './components/Role/RoleSelect.vue';
import Clock from './components/Clock/Clock.vue';
import Lessons from './components/Lesson/Lessons.vue';
import PersonalEditor from './components/Editor/PersonalEditor.vue';
import Playlist from './components/Playlist/Playlist.vue';
import Timer from './components/Timer/Timer.vue';

const userType = ref('');
const userTypeChosen = ref(false);
const showOptions = ref(false);
const widgetVisibility = ref(new Map<ComponentTypes, boolean>([[ComponentTypes.BOOKMARKS, true]]));

const componentDefinitions = shallowRef([
    {
        renderer: Bookmarks,
        customData: {
            style: '',
        },
        type: ComponentTypes.BOOKMARKS,
    },
    {
        renderer: Clock,
        customData: {
            style: '',
        },
        type: ComponentTypes.ANALOG_CLOCK,
    },
    {
        renderer: Lessons,
        customData: {
            style: '',
        },
        type: ComponentTypes.LESSONS,
    },
    {
        renderer: PersonalEditor,
        customData: {
            style: '',
        },
        type: ComponentTypes.NOTES,
    },
    {
        renderer: Playlist,
        customData: {
            style: '',
        },
        type: ComponentTypes.PLAYLIST,
    },
    {
        renderer: Timer,
        customData: {
            style: '',
        },
        type: ComponentTypes.TIMER,
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
            <div v-for="item in chosenWidgets" :key="item.type">
                <component :is="item.renderer" />
            </div>
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
