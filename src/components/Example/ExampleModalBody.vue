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

        <div>
            <h2>Timer:</h2>
            <Timer :defaultTime="15" />
        </div>
    </div>
</template>

<style scoped></style>
