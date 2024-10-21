<template>
    <div class="stopwatch" :style="{ width: widgetWidth/1.2 + 'px' }">
        <span class="stopwatch__time" :style="{ fontSize: widgetWidth / 11 + 'px' }">{{ time }}</span>
        <n-flex justify="space-between">
            <div>
                <n-button
                    v-if="!isRunning"
                    :style="{width: widgetWidth / 7 + 'px', height: widgetWidth / 10 + 'px',fontSize: widgetWidth / 30 + 'px'}"
                    strong
                    secondary
                    type="primary"
                    @click="start"
                >
                    <font-awesome-icon  :icon="['fas', 'play']" />
                </n-button>
                <n-button
                    v-else
                    :style="{ width: widgetWidth / 6 + 'px', height: widgetWidth / 10 + 'px',fontSize: widgetWidth / 30 + 'px'}"
                    strong
                    secondary
                    type="primary"
                    @click="lapTime"
                >
                    <font-awesome-icon  :icon="['fas', 'list-ol']" /> &nbsp; Lap
                </n-button>
            </div>
            <div>
                <n-button
                    :style="{ width: widgetWidth / 7 + 'px', height: widgetWidth / 10 + 'px',fontSize: widgetWidth / 30 + 'px' }"
                    strong
                    secondary
                    type="primary"
                    @click="stop"
                >
                    <font-awesome-icon  :icon="['fas', 'pause']" />
                </n-button>
            </div>
            <div>
                <n-button
                    :style="{ width: widgetWidth / 7 + 'px', height: widgetWidth / 10 + 'px',fontSize: widgetWidth / 30 + 'px' }"
                    strong
                    secondary
                    type="primary"
                    @click="reset"
                >
                    <font-awesome-icon  :icon="['fas', 'arrow-rotate-left']" />
                </n-button>
            </div>
        </n-flex>
        <n-config-provider>
            <n-data-table :style="{ fontSize: widgetWidth / 23 + 'px' }" v-if="lapTimes.length" class="mt-3" :columns="columns" :data="lapTimes" :bordered="false" />
        </n-config-provider>
    </div>
</template>

<script lang="ts" setup>
import type { ILapTime } from './interfaces/ILapTime';
import { NButton, type DataTableColumns, NDataTable, NConfigProvider, NFlex } from 'naive-ui';
import { defineProps, ref, onMounted } from 'vue';

const props = defineProps<{
    widgetWidth: number;
}>();

const time = ref('00:00:00.000');
const isRunning = ref(false);
const timeBegan = ref<Date | null>(null);
const timeStopped = ref<Date | null>(null);
const stopDuration = ref(0);
const started = ref<number | undefined>(undefined);
const lapTimes = ref<ILapTime[]>([]);
const columns = ref<DataTableColumns<ILapTime>>([]);

onMounted(() => {
    columns.value = createColumns();
});

const start = () => {
    if (isRunning.value) {
        return;
    }

    if (!timeBegan.value) {
        reset();
        timeBegan.value = new Date();
    }

    if (timeStopped.value) {
        stopDuration.value += new Date().getTime() - timeStopped.value.getTime();
    }

    started.value = setInterval(clockRunning, 10);
    isRunning.value = true;
};

const stop = () => {
    isRunning.value = false;
    timeStopped.value = new Date();
    clearInterval(started.value);
};

const reset = () => {
    isRunning.value = false;
    clearInterval(started.value);
    stopDuration.value = 0;
    timeBegan.value = null;
    lapTimes.value = [];
    timeStopped.value = null;
    time.value = '00:00:00.000';
};

const getFormmatedDate = (timeElapsed: number): string => {
    const date = new Date(timeElapsed);
    const hour = date.getUTCHours();
    const min = date.getUTCMinutes();
    const sec = date.getUTCSeconds();
    const ms = date.getUTCMilliseconds();

    return (
        zeroPrefix(hour, 2) +
        ':' +
        zeroPrefix(min, 2) +
        ':' +
        zeroPrefix(sec, 2) +
        '.' +
        zeroPrefix(ms, 3)
    );
};

const lapTime = () => {
    const lapTimeLength = lapTimes.value.length;
    const previousTime = lapTimes.value[lapTimeLength - 1];

    let lapTimeStr = time.value;
    if (previousTime) {
        const previousTimeDate = convertTimeToDate(previousTime.overallTime);
        const currentTime = convertTimeToDate(time.value);

        const difference = currentTime.getTime() - previousTimeDate.getTime();
        lapTimeStr = getFormmatedDate(difference);
    }

    const lap = lapTimes.value.length + 1;
    const overallTime = time.value;

    lapTimes.value.push({ lap, lapTime: lapTimeStr, overallTime });
};

const clockRunning = () => {
    const currentTime = new Date();
    const elapsed = currentTime.getTime() - (timeBegan.value?.getTime() || 0) - stopDuration.value;

    time.value = getFormmatedDate(elapsed);
};

const zeroPrefix = (num: number, digit: number) => {
    const zero = '0'.repeat(digit);
    return (zero + num).slice(-digit);
};

const convertTimeToDate = (timeStr: string): Date => {
    const date = new Date();

    if (!timeStr) {
        return date;
    }

    const [hours, minutes, seconds] = timeStr.split(':');
    const [secs, millis] = seconds.split('.');

    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    date.setSeconds(parseInt(secs));
    date.setMilliseconds(parseInt(millis));

    return date;
};

const createColumns = (): DataTableColumns<ILapTime> => {
    return [
        {
            title: 'No.',
            key: 'lap',
        },
        {
            title: 'Lap time',
            key: 'lapTime',
        },
        {
            title: 'Overall time',
            key: 'overallTime',
        },
    ];
};
</script>

<style scoped lang="scss">
.stopwatch {
    order: 0;
    flex: 0 1 auto;
    align-self: center;
    color: rgb(200, 200, 200);
    text-align: center;
    &__time {
        font-size: 2em;
    }
}
</style>