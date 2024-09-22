<template>
    <div class="stopwatch">
        <span class="stopwatch__time">{{ time }}</span>
        <BRow>
            <BCol>
                <BButton v-if="!isRunning" @click="start">Start</BButton>
                <BButton v-else @click="lapTime">Lap</BButton>
            </BCol>
            <BCol>
                <BButton @click="stop">Stop</BButton>
            </BCol>
            <BCol>
                <BButton @click="reset">Reset</BButton>
            </BCol>
        </BRow>
        <BTableSimple v-if="lapTimes.length" hover small caption-top responsive>
            <BThead head-variant="dark">
                <BTr>
                    <BTh>Lap</BTh>
                    <BTh>Lap Time</BTh>
                    <BTh>Overall Time</BTh>
                </BTr>
            </BThead>
            <BTbody>
                <BTr v-for="lapTime in lapTimes">
                    <BTd>{{ lapTime.lap }}</BTd>
                    <BTd>{{ lapTime.lapTime }}</BTd>
                    <BTd>{{ lapTime.overallTime }}</BTd>
                </BTr>
            </BTbody>
        </BTableSimple>
    </div>
</template>

<script lang="ts">
import type { ILapTime } from './interfaces/ILapTime';

interface IStopwatchData {
    time: string;
    timeBegan: Date | null;
    timeStopped: Date | null;
    stopDuration: number;
    started: NodeJS.Timeout | undefined;
    isRunning: boolean;
    lapTimes: ILapTime[];
}

export default {
    data(): IStopwatchData {
        return {
            time: '00:00:00.000',
            isRunning: false,
            timeStopped: null,
            timeBegan: null,
            stopDuration: 0,
            started: undefined,
            lapTimes: [],
        };
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

            console.log(JSON.parse(JSON.stringify(this.lapTimes)));
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
        font-size: 3.5em;
    }
}
</style>
