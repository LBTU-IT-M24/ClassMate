<template>
    <n-config-provider v-if="!showAddForm">
        <n-button size="small" class="mb-3" strong secondary @click="handleAddForm(true)"> Add Playlist </n-button>

        <n-data-table :columns="columns" :data="playlists" :bordered="false" />
    </n-config-provider>

    <n-form ref="formRef" v-else :label-width="80" :model="newPlaylist" :rules="rules">
        <n-form-item label="Playlist URL" path="url">
            <n-input v-model:value="newPlaylist.url" placeholder="Enter Playlist URL" />
        </n-form-item>

        <n-row :gutter="[0, 24]">
            <n-col :span="24">
                <n-button @click="handleAddForm(false)" strong secondary>Cancel</n-button>
                <n-button @click="submitPlaylist" strong secondary type="primary" style="float: right"
                    >Add Playlist</n-button
                >
            </n-col>
        </n-row>
    </n-form>
</template>

<script setup lang="ts">
import { ref, defineProps, h } from 'vue';
import { NConfigProvider, NDataTable, NButton, NForm, NFormItem, NInput, NRow, NCol } from 'naive-ui';
import { type Playlist } from './interfaces/Playlist';

const props = defineProps<{
    playlists: Playlist[];
}>();

const newPlaylist = ref<Playlist>({ url: '' });
const showAddForm = ref(false);

const rules = {
    url: {
        required: true,
        message: 'Please input playlist URL',
        trigger: 'blur',
    },
};

const columns = [
    {
        title: 'Playlist URL',
        key: 'url',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (row: Playlist) => {
            return h(
                NButton,
                {
                    strong: true,
                    tertiary: true,
                    size: 'small',
                    onClick: () => removePlaylist(row.url),
                    type: 'error',
                    secondary: true,
                },
                { default: () => 'Remove' },
            );
        },
    },
];

const submitPlaylist = () => {
    if (!isValid()) {
        return;
    }

    props.playlists.push({ url: newPlaylist.value.url });
    resetForm();
    handleAddForm(false);
};

const removePlaylist = (playlistUrl: string) => {
    const index = props.playlists.findIndex((playlist) => playlist.url === playlistUrl);
    if (index !== -1) {
        props.playlists.splice(index, 1);
    }
};

const handleAddForm = (value: boolean) => {
    showAddForm.value = value;
};

const resetForm = () => {
    newPlaylist.value = { url: '' };
};

const isValid = (): boolean => {
    return !!newPlaylist.value.url;
};
</script>

<style scoped></style>
