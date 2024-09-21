<script lang="ts"></script>

<template>
    <div class="example-wrapper">
        <div class="clock-wrapper">
            <h2>Clock:</h2>
            <div class="clock-body">
                <AnalogClock />
            </div>
        </div>
        <div>
            <h2>Calendar:</h2>
            <VCalendar />
        </div>
    </div>
</template>

<style scoped>
.example-wrapper {
    align-items: center;
}

.clock-body {
    font-size: 10px;
}
</style>
