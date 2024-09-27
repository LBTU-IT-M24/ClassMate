<script setup lang="ts">
import ExampleModal from './components/Example/ExampleModal.vue';
</script>

<template>
    <header></header>

    <main>
        <ExampleModal />
        <Draggable :initialX="500" :initialY="500"><Timer /> </Draggable>
        <Draggable :initialX="200" :initialY="200"><Stopwatch /> </Draggable>
        <Draggable :initialX="900" :initialY="300"><Clock /> </Draggable>
    </main>
</template>

<style scoped></style>
