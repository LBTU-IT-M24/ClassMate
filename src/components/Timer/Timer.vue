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
            <span class="base-timer__label" @click="onModalOpen">
                {{ formattedTimeLeft }}
            </span>
        </div>
    </div>

    <n-flex justify="content-between">
        <div v-if="!isEnabled" @click="startTimer">
            <n-button class="w-100 m-1" strong secondary type="primary"
                ><font-awesome-icon :icon="['fas', 'play']" />
            </n-button>
        </div>
        <div v-else>
            <n-button class="w-100 m-1" @click="pauseTimer" strong secondary type="primary"
                ><font-awesome-icon :icon="['fas', 'pause']" />
            </n-button>
        </div>
        <div>
            <n-button strong secondary type="primary" class="w-100 m-1" @click="resetTimer"
                ><font-awesome-icon :icon="['fas', 'arrow-rotate-left']" />
            </n-button>
        </div>
    </n-flex>
    <n-modal v-model:show="isModalOpen">
        <n-card style="width: 600px" :bordered="false" size="small">
            <VueDatePicker v-model="time" @closed="closedModal" time-picker enable-seconds :clearable="false" />
        </n-card>
    </n-modal>
</template>

<script lang="ts">
import { secondsToTime, timeToSeconds } from '@/helpers/Time/TimeFunctions';
import type { ITimeModel } from '@/models/Date/ITimeModel';
import { NButton, NModal, NCard, NFlex } from 'naive-ui';

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
    timerInterval: number | null;
    currentTimeLimit: number;
    isEnabled: boolean;
    time: ITimeModel;
    isModalOpen: boolean;
}

export default {
    components: {
        NButton,
        NModal,
        NCard,
        NFlex,
    },
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
    min-width: 280px;
    height: 280px;

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
