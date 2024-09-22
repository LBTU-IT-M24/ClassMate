<template>
    <BTabs class="switchable-timer">
        <BTab title="Timer">
            <div class="switchable-timer__item">
                <Timer />
            </div>
        </BTab>
        <BTab title="Stopwatch">
            <div class="switchable-timer__item">
                <Stopwatch />
            </div>
        </BTab>
    </BTabs>
</template>

<script lang="ts"></script>

<style scoped lang="scss">
.switchable-timer {
    &__item {
        display: flex;
        justify-content: center;
    }
}
</style>
