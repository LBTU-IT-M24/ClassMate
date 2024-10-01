<script setup lang="ts">
import { ref } from 'vue';
import SwitchableTimer from '@/components/Timer/SwitchableTimer.vue';
import Clock from '@/components/Clock/Clock.vue';
import NavConfigurationModal from './App/Navbar/NavConfigurationModal.vue';
import { ComponentTypes } from './enums/ComponentTypes';
import { BCol, BRow } from 'bootstrap-vue-next';
import WidgetWrapper from './components/Widget/WidgetWrapper.vue';

const userType = ref('');
const userTypeChosen = ref(false);
const showOptions = ref(false);
const widgetVisibility = ref(new Map<ComponentTypes, boolean>([[ComponentTypes.TIMER, true]]));

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
        <div class="row custom-width align-items-center vh-100" v-if="!userTypeChosen">
            <div
                class="col-12 col-md-5 d-flex flex-column align-items-center justify-content-center mb-4 mb-md-0 text-center bg-light p-4"
            >
                <h2>Choose your role</h2>
                <button
                    @click="chooseUserType('Teacher')"
                    class="btn btn-outline-primary mb-3 w-75"
                    style="border-radius: 30px"
                >
                    Teacher
                </button>
                <button
                    @click="chooseUserType('Student')"
                    class="btn btn-outline-primary w-75"
                    style="border-radius: 30px"
                >
                    Student
                </button>
            </div>

            <div class="col-12 col-md-7 d-flex flex-column align-items-start">
                <img src="https://via.placeholder.com/300x200" alt="placeholder" class="mb-3 img-fluid" />
                <p>
                    Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent
                    delectus delicata usu. Vidit dissentiet eos cu eum an brute copiosae hendrerit. Eos erant dolorum
                    an. Per facer affert ut. Mei iisque mentitum moderatius cu.
                </p>
            </div>
        </div>
        <div class="w-100 p-4" v-else>
            <BRow>
                <BCol
                    class="mb-4 col-xl-4 col-lg-6 col-12"
                    style="min-width: 330px"
                    v-if="widgetVisibility.get(ComponentTypes.ANALOG_CLOCK)"
                >
                    <WidgetWrapper :title="`Analog Clock`">
                        <Clock timeFormat="24hour" hourFormat="standard" :outerFont="0.2" :innerFont="0.1" />
                    </WidgetWrapper>
                </BCol>
                <BCol
                    class="mb-4 col-xl-4 col-lg-6 col-12"
                    style="min-width: 330px"
                    v-if="widgetVisibility.get(ComponentTypes.TIMER)"
                >
                    <WidgetWrapper :title="`Timer/Stopwatch`">
                        <SwitchableTimer />
                    </WidgetWrapper>
                </BCol>
                <BCol class="mb-4 col-xl-4 col-lg-6 col-12" v-if="widgetVisibility.get(ComponentTypes.BOOKMARKS)">
                    <WidgetWrapper :title="`Bookmarks`">
                        <div class="d-flex flex-wrap">
                            <button class="btn btn-link">E-klase.lv</button>
                            <button class="btn btn-link">TavaKlase.lv</button>
                            <button class="btn btn-link">Skolo.lv</button>
                            <button class="btn btn-link">Miro.com</button>
                            <button class="btn btn-link">Tavaklase.lv</button>
                            <button class="btn btn-link">SkolasSoma.lv</button>
                        </div>
                    </WidgetWrapper>
                </BCol>
                <BCol class="mb-4 col-xl-4 col-lg-6 col-12" v-if="widgetVisibility.get(ComponentTypes.LESSONS)">
                    <WidgetWrapper :title="`Lessons`">
                        <ul class="list-unstyled">
                            <li>Lesson 1</li>
                            <li>Lesson 2</li>
                            <li>Lesson 3</li>
                            <li>Lesson 4</li>
                        </ul>
                    </WidgetWrapper>
                </BCol>
                <BCol class="mb-4 col-xl-4 col-lg-6 col-12" v-if="widgetVisibility.get(ComponentTypes.NOTES)">
                    <WidgetWrapper :title="`Notes`">
                        <textarea class="form-control mb-2" rows="4" placeholder="Write your notes here..."></textarea>
                        <button class="btn btn-success">Save</button>
                    </WidgetWrapper>
                </BCol>
                <BCol class="mb-4 col-xl-4 col-lg-6 col-12" v-if="widgetVisibility.get(ComponentTypes.PLAYLIST)">
                    <WidgetWrapper :title="`Playlist`">
                        <iframe
                            width="100%"
                            height="315"
                            src="https://www.youtube.com/embed/674KGKRQBPE?si=07PH1zLMEEmkSlhQ"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                        ></iframe>
                    </WidgetWrapper>
                </BCol>
            </BRow>
        </div>

        <div class="overlay"></div>
    </main>
</template>

<style scoped>
.custom-width {
    width: 100%;
    z-index: 2;
}

@media (min-width: 1408px) {
    .custom-width {
        width: 50%;
        z-index: 2;
    }
}
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
