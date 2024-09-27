<template>
    <div class="base-timer">
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g class="base-timer__circle">
                <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                <path
                    :stroke-dasharray="circleDasharray"
                    class="base-timer__path-remaining"
                    :class="remainingPathColor"
                    d="
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                    "
                ></path>
            </g>
        </svg>
        <div class="base-timer__body">
            <BRow class="w-100">
                <BCol class="col-12 col-sm-12 col-md-12">
                    <span class="base-timer__label" @click="onModalOpen">
                        {{ formattedTimeLeft }}
                    </span>
                </BCol>
            </BRow>
        </div>
    </div>
    <BRow class="base-timer__controls">
        <BCol v-if="!isEnabled" sm-="12" md="6" @click="startTimer"><BButton class="w-100 m-1">Start</BButton></BCol>
        <BCol v-else sm-="12" md="6"><BButton class="w-100 m-1" @click="pauseTimer">Pause</BButton></BCol>
        <BCol sm-="12" md="6"><BButton class="w-100 m-1" @click="resetTimer">Reset</BButton></BCol>
    </BRow>
    <BModal v-model="isModalOpen" hide-header hide-footer>
        <VueDatePicker v-model="time" @closed="closedModal" time-picker enable-seconds :clearable="false" />
    </BModal>
</template>

<script lang="ts">
import { secondsToTime, timeToSeconds } from '@/helpers/Time/TimeFunctions';
import type { ITimeModel } from '@/models/Date/ITimeModel';

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
    info: {
        color: 'green',
    },
    warning: {
        color: 'orange',
        threshold: WARNING_THRESHOLD,
    },
    alert: {
        color: 'red',
        threshold: ALERT_THRESHOLD,
    },
};

interface ITimerData {
    timePassed: number;
    timerInterval: NodeJS.Timeout | null;
    currentTimeLimit: number;
    isEnabled: boolean;
    time: ITimeModel;
    isModalOpen: boolean;
}

export default {
    data(): ITimerData {
        return {
            timePassed: 0,
            timerInterval: null,
            currentTimeLimit: this.$props.defaultTime,
            isEnabled: false,
            time: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
            isModalOpen: false,
        };
    },
    props: {
        defaultTime: {
            default: 600,
            type: Number,
        },
    },
    computed: {
        circleDasharray() {
            return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
        },
        formattedTimeLeft() {
            const time = secondsToTime(this.timeLeft);

            const formatLabel = (value: number): string => {
                if (!value) {
                    return '00';
                }

                if (value < 10) {
                    return `0${value}`;
                }

                return value.toString();
            };

            let timeLeftLabel = `${formatLabel(time.hours)}:`;
            timeLeftLabel += `${formatLabel(time.minutes)}:`;
            timeLeftLabel += formatLabel(time.seconds);

            return timeLeftLabel;
        },

        timeLeft() {
            return Math.max(this.currentTimeLimit - this.timePassed, 0);
        },

        timeFraction() {
            return this.timeLeft / this.currentTimeLimit;
        },

        remainingPathColor() {
            const { alert, warning, info } = COLOR_CODES;

            if (this.timeLeft <= alert.threshold) {
                return alert.color;
            } else if (this.timeLeft <= warning.threshold) {
                return warning.color;
            } else {
                return info.color;
            }
        },
    },

    watch: {
        timeLeft(newValue) {
            if (newValue <= 0) {
                this.onTimesUp();
            }
        },
    },
    methods: {
        closedModal() {
            this.isModalOpen = false;
            this.currentTimeLimit = timeToSeconds(this.time);
        },
        onModalOpen() {
            this.isModalOpen = true;
            this.time = secondsToTime(this.currentTimeLimit);
        },
        onTimesUp() {
            this.clearTimerInterval();
        },
        startTimer() {
            this.isEnabled = true;
            this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
        },
        pauseTimer() {
            this.isEnabled = false;
            this.clearTimerInterval();
        },
        resetTimer() {
            this.clearTimerInterval();
            this.timePassed = 0;
            this.currentTimeLimit = this.$props.defaultTime;
            this.isEnabled = false;
        },
        clearTimerInterval() {
            clearInterval(this.timerInterval || undefined);
        },
    },
};
</script>

<style scoped lang="scss">
.dp__input_icon {
    display: none !important;
}
.base-timer {
    position: relative;
    width: 300px;
    height: 300px;

    &__svg {
        transform: scaleX(-1);
    }

    &__circle {
        fill: none;
        stroke: none;
    }

    &__path-elapsed {
        stroke-width: 7px;
        stroke: grey;
    }

    &__path-remaining {
        stroke-width: 7px;
        stroke-linecap: round;
        transform: rotate(90deg);
        transform-origin: center;
        transition: 1s linear all;
        fill-rule: nonzero;
        stroke: currentColor;

        &.green {
            color: rgb(65, 184, 131);
        }

        &.orange {
            color: orange;
        }

        &.red {
            color: red;
        }
    }

    &__body {
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border: none;
        background-color: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__controls {
        display: flex;
    }

    &__label {
        align-items: center;
        display: flex;
        justify-content: center;
        text-align: center;
        font-size: 48px;
        text-decoration: underline;
        text-decoration-thickness: from-font;
        outline: none;
    }
}
</style>
