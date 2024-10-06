<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="400"
        height="150"
        viewBox="0 0 400 150"
    >
        <defs>
            <filter id="ClassMate" x="0" y="0" width="390" height="120" filterUnits="userSpaceOnUse">
                <feOffset dx="-4" dy="-4" input="SourceAlpha" />
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feFlood flood-color="#fff" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
            </filter>
            <filter id="ClassMate-2" x="8" y="8" width="390" height="120" filterUnits="userSpaceOnUse">
                <feOffset dx="4" dy="4" input="SourceAlpha" />
                <feGaussianBlur stdDeviation="6" result="blur-2" />
                <feFlood flood-color="#919191" flood-opacity="0.702" />
                <feComposite operator="in" in2="blur-2" />
                <feComposite in="SourceGraphic" />
            </filter>
        </defs>

        <g id="Group_43" data-name="Group 43" transform="translate(-116 -340)">
            <g transform="matrix(1, 0, 0, 1, 116, 340)" filter="url(#ClassMate)">
                <text
                    id="ClassMate-3"
                    data-name="ClassMate"
                    transform="translate(30 110)"
                    fill="#cfcfcf"
                    font-size="60"
                    font-family="MuseoModerno, sans-serif"
                >
                    <tspan x="0" y="0">ClassMate</tspan>
                </text>
            </g>
            <g transform="matrix(1, 0, 0, 1, 116, 340)" filter="url(#ClassMate-2)">
                <text
                    id="ClassMate-4"
                    data-name="ClassMate"
                    transform="translate(30 110)"
                    fill="#cfcfcf"
                    font-size="60"
                    font-family="MuseoModerno, sans-serif"
                >
                    <tspan x="0" y="0">ClassMate</tspan>
                </text>
            </g>
        </g>
    </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'IconClassMate',
});
</script>

<style scoped></style>
