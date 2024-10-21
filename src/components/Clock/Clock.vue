<template>
    <div class="clock" :style="{ width: String(size) + 'px' }">
        <canvas :width="size" :height="size" ref="clockCanvas" />
        <p v-if="showLabel">Current time: {{ timeFormatted }}</p>
    </div>
</template>

<script lang="ts">
import { formatDate } from '@/helpers/Date/DateFunctions';
import { ComponentTypes } from '@/enums/ComponentTypes';
type ConvasRenderingType = CanvasRenderingContext2D | null;

const DEFAULT_SIZE = 280;

export interface IClockData {
    time: Date | null;
    timeFormatted: string;
    drawingContext: ConvasRenderingType;
    clockCanvas: HTMLCanvasElement | null;
    draw24hour: boolean;
    drawRoman: boolean;
    timerId: number | undefined;
}

export default {
    name: 'Clock',
    computed: {
        ComponentTypes() {
            return ComponentTypes;
        },
        size() {
            return this.clockSize ;
        },
        radius() {
            return (this.size) / 2;
        },
    },
    props: {
        timeFormat: {
            type: String,
            default: '24hour',
        },
        hourFormat: {
            type: String,
            default: 'standard',
        },
        innerFont: {
            type: Number,
            default: 0.075,
        },
        outerFont: {
            type: Number,
            default: 0.15,
        },
        fillColor: {
            type: String,
            default: 'white',
        },
        showLabel: {
            type: Boolean,
            default: true,
        },
        clockSize: {
            type: Number,
            default: DEFAULT_SIZE,
        },
    },
    data(): IClockData {
        return {
            time: null,
            timeFormatted: '',
            drawingContext: null,
            clockCanvas: null,
            draw24hour: this.timeFormat.toLowerCase().trim() === '24hour',
            drawRoman: !this.draw24hour && this.hourFormat.toLowerCase().trim() === 'roman',
            timerId: undefined,
        };
    },
    methods: {
        drawFace(ctx: ConvasRenderingType, radius: number) {
            if (!ctx) {
                return;
            }

            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, 2 * Math.PI);
            ctx.fillStyle = this.fillColor;
            ctx.fill();

            const grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
            grad.addColorStop(0, '#333');
            grad.addColorStop(0.5, this.fillColor);
            grad.addColorStop(1, '#333');
            ctx.strokeStyle = grad;
            ctx.lineWidth = radius * 0.1;
            ctx.stroke();
        },
        drawNumbers(ctx: ConvasRenderingType, radius: number) {
            if (!ctx) {
                return;
            }

            const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
            const fontBig = radius * this.outerFont + 'px Arial';
            const fontSmall = radius * this.innerFont + 'px Arial';
            let ang, num;

            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            for (num = 1; num < 13; num++) {
                ang = (num * Math.PI) / 6;
                ctx.rotate(ang);
                ctx.translate(0, -radius * 0.78);
                ctx.rotate(-ang);
                ctx.font = fontBig;
                ctx.fillStyle = 'black';
                ctx.fillText(this.drawRoman ? romans[num - 1] : num.toString(), 0, 0);
                ctx.rotate(ang);
                ctx.translate(0, radius * 0.78);
                ctx.rotate(-ang);

                // Draw inner numerals for 24 hour time format
                if (this.draw24hour) {
                    ctx.rotate(ang);
                    ctx.translate(0, -radius * 0.6);
                    ctx.rotate(-ang);
                    ctx.font = fontSmall;
                    ctx.fillStyle = 'red';
                    ctx.fillText((num + 12).toString(), 0, 0);
                    ctx.rotate(ang);
                    ctx.translate(0, radius * 0.6);
                    ctx.rotate(-ang);
                }
            }

            // Write author text
            ctx.font = fontSmall;
            ctx.fillStyle = '#3D3B3D';
            ctx.translate(0, radius * 0.3);
            ctx.translate(0, -radius * 0.3);
        },
        drawTicks(ctx: ConvasRenderingType, radius: number) {
            let numTicks, tickAng, tickX, tickY;

            if (!ctx) {
                return;
            }

            for (numTicks = 0; numTicks < 60; numTicks++) {
                tickAng = (numTicks * Math.PI) / 30;
                tickX = radius * Math.sin(tickAng);
                tickY = -radius * Math.cos(tickAng);

                ctx.beginPath();
                ctx.lineWidth = radius * 0.01;
                ctx.moveTo(tickX, tickY);
                if (numTicks % 5 === 0) {
                    ctx.lineTo(tickX * 0.88, tickY * 0.88);
                } else {
                    ctx.lineTo(tickX * 0.92, tickY * 0.92);
                }
                ctx.stroke();
            }
        },
        drawHand(ctx: CanvasRenderingContext2D, position: number, length: number, width: number, color = 'black') {
            ctx.beginPath();
            ctx.lineWidth = width;
            ctx.lineCap = 'round';
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.moveTo(0, 0);
            ctx.rotate(position);
            ctx.lineTo(0, -length);
            ctx.stroke();
            ctx.rotate(-position);
        },
        drawTime(ctx: ConvasRenderingType, radius: number) {
            const now = this.time;

            if (!now || !ctx) {
                return;
            }

            let hour = now.getHours();
            let minute = now.getMinutes();
            let second = now.getSeconds();

            // hour
            hour %= 12;
            hour = (hour * Math.PI) / 6 + (minute * Math.PI) / (6 * 60) + (second * Math.PI) / (360 * 60);
            this.drawHand(ctx, hour, radius * 0.5, radius * 0.05);
            // minute
            minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
            this.drawHand(ctx, minute, radius * 0.8, radius * 0.05);
            // second
            second = (second * Math.PI) / 30;
            this.drawHand(ctx, second, radius * 0.9, radius * 0.02, 'red');
        },
        tick() {
            this.time = new Date();
            const ctx = this.drawingContext;


            ctx?.clearRect(-this.radius, -this.radius, this.size, this.size);
            ctx?.save();
            ctx?.translate(this.radius, this.radius);


            this.drawFace(ctx, this.radius*0.9);
            this.drawNumbers(ctx, this.radius*0.9);
            this.drawTicks(ctx, this.radius*0.9);
            this.drawTime(ctx, this.radius*0.9);

            this.timeFormatted = formatDate(this.time);

            ctx?.restore();
        },
    },
    mounted() {
        this.drawingContext = (this.$refs.clockCanvas as HTMLCanvasElement).getContext('2d');
        this.timerId = setInterval(() => this.tick(), 1000);
    },
    beforeUnmount() {
        clearInterval(this.timerId);
    },
};
</script>

<style scoped>
.clock {
    display: flex;
    flex-direction: column;
    align-items: center;  /* Centers items horizontally */
    justify-content: center; /* Centers items vertically */
    text-align: center;
}

canvas {
    display: block;
    margin: 0 auto;
}
</style>