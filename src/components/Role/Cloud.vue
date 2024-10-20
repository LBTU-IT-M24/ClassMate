<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 260" style="width: 100%; height: auto">
        <defs>
            <filter id="Path_56" x="0" y="0" width="576" height="291.954" filterUnits="userSpaceOnUse">
                <feOffset dx="10" dy="10" />
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feFlood flood-color="#2a3439" flood-opacity="0.212" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
            </filter>
        </defs>
        <g id="Group_62" transform="translate(-856 -524)">
            <g class="cls-4" transform="matrix(1, 0, 0, 1, 856, 524)">
                <path
                    id="Path_56-2"
                    class="cls-1"
                    d="M10,0H536a10,10,0,0,1,10,10V205a10,10,0,0,1-10,10H500.1l17.076,46.954L448.875,215H10A10,10,0,0,1,0,205V10A10,10,0,0,1,10,0Z"
                    transform="translate(5 5)"
                />
            </g>
            <text
                id="_Welcome_to_Classmate_your_shared_digital_board_for_students_and_teachers_alike._Login_now_and_elevate_your_classroom_experience._"
                class="cls-2"
                transform="translate(909 573)"
            >
                <tspan x="0" y="24" xml:space="preserve">Welcome to Classmate, your shared digital</tspan>
                <tspan x="0" y="53">board for students and teachers alike.</tspan>
                <tspan x="0" y="82">Login now and elevate your classroom</tspan>
                <tspan x="0" y="113">experience.</tspan>
                <tspan class="cls-3" y="113">📚</tspan>
            </text>
        </g>
    </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ClassmateWelcomeIcon',
});
</script>

<style scoped>
.cls-1 {
    fill: #0ead69;
}

.cls-2 {
    fill: #fff;
    font-size: 24px;
    font-family: Barlow-Italic, Barlow, serif;
    font-style: italic;
}

.cls-3 {
    font-family:
        SegoeUIEmoji,
        Segoe UI Emoji,
        serif;
    font-style: normal;
}

.cls-4 {
    filter: url(#Path_56);
}
</style>
