<template>
    <BaseWidgetDraggable
        :title="`Lessons`"
        :type="ComponentTypes.LESSONS"
        @update-position="$emit('update-position')"
        style="width:400px"
    >
        <template v-slot:widget>
            <n-flex class="mb-3" direction="row" align="center" justify="center">
                <n-button class="mr-2" strong info @click="changeDay(-1)">&larr;</n-button>
                    <strong>{{ formattedDate }}</strong>
                <n-button class="ml-4" strong info @click="changeDay(1)">&rarr;</n-button>
            </n-flex>
            <n-list bordred>
                <n-list-item
                    v-for="lesson in currentLessons"
                    :key="lesson.id"
                    :class="{ 'lesson-passed': hasLessonPassed(lesson.dateTime) }"
                >
                        <div class="lesson-details">
                            <strong>{{ lesson.name }}</strong>
                            <span class="lesson-time"> - {{ formatTime(lesson.dateTime) }}</span>
                        </div>
                </n-list-item>
            </n-list>
        </template>

        <template v-slot:styleConfiguration>
            <LessonsConfiguration :lessons="lessons" />
        </template>
    </BaseWidgetDraggable>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ComponentTypes } from '@/enums/ComponentTypes';
import LessonsConfiguration from '@/components/Lesson/LessonsConfiguration.vue';
import { NButton,NList,NFlex,NListItem } from 'naive-ui';
import { useAuth } from '@/stores/useAuth';
import type { Lesson } from '@/components/Lesson/interfaces/Lesson';
const auth = useAuth();
const { isTeacher } = auth;


const lessons = ref<Lesson[]>([]);

const teacherLessons = ref<Lesson[]>([
    { id: 1, name: 'IITF 1. kurss', dateTime: '2024-10-10T16:07:00' },
    { id: 2, name: 'IITF 2. kurss', dateTime: '2024-10-10T16:10:00' },
    { id: 3, name: 'ESAF 1. kurss', dateTime: '2024-10-10T16:12:00' },
    { id: 4, name: 'ESAF 2. kurss', dateTime: '2024-10-10T16:15:00' },
]);

const studentLessons = ref<Lesson[]>([
    { id: 5, name: 'Matemātika', dateTime: '2024-10-10T16:07:00' },
    { id: 6, name: 'Fizika', dateTime: '2024-10-10T16:10:00' },
]);

onMounted(() => {
    lessons.value = isTeacher ? teacherLessons.value : studentLessons.value;
});
const currentDate = ref(new Date());

const formattedDate = computed(() => {
    return currentDate.value.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
});

const currentLessons = computed(() => {
    const currentDateString = currentDate.value.toISOString().split('T')[0];
    return lessons.value.filter((lesson) => lesson.dateTime.startsWith(currentDateString));
});

const changeDay = (days: number) => {
    const newDate = new Date(currentDate.value);
    newDate.setDate(newDate.getDate() + days);
    currentDate.value = newDate;
};

const hasLessonPassed = (lessonDateTime: string) => {
    return new Date() > new Date(lessonDateTime)
};

const formatTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
</script>

<style scoped lang="scss">
.lesson-passed {
    color: gray;
    text-decoration: line-through;
}
</style>