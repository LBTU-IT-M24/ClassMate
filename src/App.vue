<script setup lang="ts"></script>

<template>
    <header></header>

    <main>
        <Draggable :initialX="500" :initialY="500">
            <Clock :size="300" timeFormat="24hour" hourFormat="standard" :outerFont="0.2" :innerFont="0.1" />
        </Draggable>
        <Draggable :initialX="200" :initialY="200"><VCalendar /> </Draggable>
        <Draggable :initialX="900" :initialY="300"><SwitchableTimer /> </Draggable>
    </main>
</template>

<style scoped></style>
