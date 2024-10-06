<template>
    <div class="stopwatch">
        <span class="stopwatch__time">{{ time }}</span>
        <n-flex justify="space-between">
            <div>
                <n-button v-if="!isRunning" strong secondary type="primary" @click="start"
                    ><font-awesome-icon :icon="['fas', 'play']"
                /></n-button>
                <n-button v-else @click="lapTime" strong secondary type="primary">
                    <font-awesome-icon :icon="['fas', 'list-ol']" /> &nbsp; Lap</n-button
                >
            </div>
            <div>
                <n-button strong secondary type="primary" @click="stop"
                    ><font-awesome-icon :icon="['fas', 'pause']"
                /></n-button>
            </div>
            <div>
                <n-button strong secondary type="primary" @click="reset"
                    ><font-awesome-icon :icon="['fas', 'arrow-rotate-left']"
                /></n-button>
            </div>
        </n-flex>
        <n-config-provider>
            <n-data-table v-if="lapTimes.length" class="mt-3" :columns="columns" :data="lapTimes" :bordered="false" />
        </n-config-provider>
    </div>
</template>

<script lang="ts">
import type { ILapTime } from './interfaces/ILapTime';
import { NButton, type DataTableColumns, NDataTable, NConfigProvider, NFlex } from 'naive-ui';

interface IStopwatchData {
    time: string;
    timeBegan: Date | null;
    timeStopped: Date | null;
    stopDuration: number;
    started: number | undefined;
    isRunning: boolean;
    lapTimes: ILapTime[];
    columns: DataTableColumns<ILapTime>;
}

export default {
    components: {
        NButton,
        NDataTable,
        NConfigProvider,
        NFlex,
    },
    data(): IStopwatchData {
        return {
            time: '00:00:00.000',
            isRunning: false,
            timeStopped: null,
            timeBegan: null,
            stopDuration: 0,
            started: undefined,
            lapTimes: [],
            columns: [],
        };
    },
    created() {
        this.columns = this.createColumns();
    },
    methods: {
        start() {
            if (this.isRunning) {
                return;
            }

            if (!this.timeBegan) {
                this.reset();
                this.timeBegan = new Date();
            }

            if (this.timeStopped) {
                this.stopDuration += new Date().getTime() - this.timeStopped.getTime();
            }

            this.started = setInterval(this.clockRunning, 10);
            this.isRunning = true;
        },
        stop() {
            this.isRunning = false;
            this.timeStopped = new Date();
            clearInterval(this.started);
        },
        reset() {
            this.isRunning = false;
            clearInterval(this.started);
            this.stopDuration = 0;
            this.timeBegan = null;
            this.lapTimes = [];
            this.timeStopped = null;
            this.time = '00:00:00.000';
        },
        getFormmatedDate(time: number): string {
            const timeElapsed = new Date(time);

            const hour = timeElapsed.getUTCHours();
            const min = timeElapsed.getUTCMinutes();
            const sec = timeElapsed.getUTCSeconds();
            const ms = timeElapsed.getUTCMilliseconds();

            return (
                this.zeroPrefix(hour, 2) +
                ':' +
                this.zeroPrefix(min, 2) +
                ':' +
                this.zeroPrefix(sec, 2) +
                '.' +
                this.zeroPrefix(ms, 3)
            );
        },
        lapTime() {
            const lapTimeLength = this.lapTimes.length;
            const previousTime = this.lapTimes[lapTimeLength - 1];

            let lapTime = this.time;
            if (previousTime) {
                const previousTimeDate = this.convertTimeToDate(previousTime.overallTime);
                const currentTime = this.convertTimeToDate(this.time);

                const difference = currentTime.getTime() - previousTimeDate.getTime();
                lapTime = this.getFormmatedDate(difference);
            }

            const lap = this.lapTimes.length + 1;
            const overallTime = this.time;

            this.lapTimes.push({ lap, lapTime, overallTime });
        },
        clockRunning() {
            const currentTime = new Date();
            const elapsed = currentTime.getTime() - (this.timeBegan?.getTime() || 0) - this.stopDuration;

            this.time = this.getFormmatedDate(elapsed);
        },
        zeroPrefix(num: number, digit: number) {
            var zero = '';
            for (var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        convertTimeToDate(time: string): Date {
            const date = new Date();

            if (!time) {
                return date;
            }

            const [hours, minutes, seconds] = time.split(':');
            const [secs, millis] = seconds.split('.');

            date.setHours(parseInt(hours));
            date.setMinutes(parseInt(minutes));
            date.setSeconds(parseInt(secs));
            date.setMilliseconds(parseInt(millis));

            return date;
        },

        createColumns(): DataTableColumns<ILapTime> {
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
        },
    },
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
