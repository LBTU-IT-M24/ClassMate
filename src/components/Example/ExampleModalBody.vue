<script lang="ts"></script>

<template>
    <div class="example-wrapper">
        <div class="clock-wrapper">
            <h2>Clock:</h2>
            <div class="clock-body">
                <Clock :size="300" timeFormat="24hour" hourFormat="standard" :outerFont="0.2" :innerFont="0.1" />
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
