<template>
    <n-config-provider v-if="!showAddForm">
        <n-button size="small" class="mb-3" strong secondary @click="setIsAddFormOpen(true)">
            Add Lesson
        </n-button>
        <n-data-table :columns="columns" :data="lessons" :bordered="false" />
    </n-config-provider>

    <n-form ref="formRef" v-else :label-width="80" :model="newLesson" :rules="rules">
        <n-form-item label="Lesson Name" path="name">
            <n-input v-model:value="newLesson.name" placeholder="Lesson Name" />
        </n-form-item>
        <n-form-item label="Lesson Date" path="date">
            <n-date-picker v-model:value="lessonDate"  placeholder="Select Lesson Date" />
        </n-form-item>
        <n-form-item label="Lesson Time" path="time">
            <n-time-picker v-model:value="lessonTime" use-12-hours format="hh:mm a"   placeholder="Select Lesson Time" />
        </n-form-item>
        <n-row :gutter="[0, 24]">
            <n-col :span="24">
                <n-button @click="setIsAddFormOpen(false)" strong secondary>Cancel</n-button>
                <n-button @click="submitLesson" strong secondary type="primary" style="float: right">Add Lesson</n-button>
            </n-col>
        </n-row>
    </n-form>
</template>

<script setup lang="ts">
import { ref, defineProps, h } from 'vue';
import type { Lesson } from './interfaces/Lesson';
import { NDatePicker, NTimePicker, NDataTable, NButton, NConfigProvider, NForm, NFormItem, NInput, NRow, NCol } from 'naive-ui';

const props = defineProps<{
    lessons: Lesson[];
}>();

const getMaxId = (lessons: Lesson[]): number => {
    return lessons.length ? Math.max(...lessons.map(lesson => lesson.id)) : 0;
};

let idCounter = getMaxId(props.lessons) + 1;

const newLesson = ref<Lesson>({
    id: idCounter,
    name: '',
    dateTime: '',
});

const lessonDate = ref(null);
const lessonTime = ref(null);
const showAddForm = ref(false);

const rules = {
    name: {
        required: true,
        message: 'Please input lesson name',
        trigger: 'blur',
    },
    dateTime: {
        required: true,
        message: 'Please select a valid date and time',
        trigger: 'blur',
    },
};

const columns = [
    {
        title: 'Lesson Name',
        key: 'name'
    },
    {
        title: 'Date & Time',
        key: 'dateTime',
        render: (row: Lesson) => formatDateTime(row.dateTime),
    },
    {
        title: 'Actions',
        key: 'actions',
        render: ({ id }: Lesson) => {
            return h(
                NButton,
                {
                    strong: true,
                    tertiary: true,
                    size: 'small',
                    onClick: () => removeLesson(id),
                    type: 'error',
                    secondary: true,
                },
                { default: () => 'Remove' },
            );
        },
    },
];

const submitLesson =  () => {
    if (!( isValid())) return;

    if (lessonDate.value && lessonTime.value) {
        const date = new Date(lessonDate.value);
        const time = new Date(lessonTime.value);

        date.setHours(time.getHours(), time.getMinutes());

        const combinedDateTime = date.toISOString();

        const lesson = { id: idCounter++, name: newLesson.value.name, dateTime: combinedDateTime };

        props.lessons.push(lesson);
        resetForm();
        setIsAddFormOpen(false);
    }
};

const removeLesson = (lessonId: number) => {
    const index = props.lessons.findIndex((lesson) => lesson.id === lessonId);
    if (index !== -1) {
        props.lessons.splice(index, 1);
    }
};

const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

const resetForm = () => {
    newLesson.value = { id: idCounter, name: '', dateTime: '' };
    lessonDate.value = null;
    lessonTime.value = null;
};

const setIsAddFormOpen = (value: boolean) => {
    showAddForm.value = value;
};

const isValid = (): boolean => {
    return !!(newLesson.value.name && lessonDate.value && lessonTime.value);
};
</script>

<style scoped>
</style>