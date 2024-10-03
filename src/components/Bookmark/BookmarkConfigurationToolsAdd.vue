<template>
    <BRow>
        <BCollapse id="my-collapse">
            <template #header="{ visible, toggle, id }">
                <BCol>
                    <BButton variant="primary" :aria-expanded="visible" :aria-controls="id" @click="toggle">
                        <span>{{ visible ? 'Close' : 'Open' }}</span> add form
                    </BButton>
                </BCol>
            </template>

            <BForm @submit="submitForm" class="mt-2">
                <BFormFloatingLabel id="input-group-1" label="Name" label-for="input-1">
                    <BFormInput id="input-1" v-model="bookmarkForm.name" placeholder="Enter name" required />
                </BFormFloatingLabel>
                <BFormFloatingLabel id="input-group-2" label="Url" label-for="input-2" class="mt-3">
                    <BFormInput id="input-2" v-model="bookmarkForm.url" placeholder="Enter URL" required />
                </BFormFloatingLabel>
                <BButton type="submit" class="mt-3" variant="primary">Submit</BButton>
            </BForm>
        </BCollapse>
    </BRow>
</template>

<script lang="ts">
import { guid } from '@/helpers/Random/guid';
import type { IBookmarkModel } from './interfaces/IBookmarkModel';

export interface IBookmarkConfigurationToolsAdd {
    bookmarkForm: IBookmarkModel;
}

export default {
    data() {
        return {
            bookmarkForm: {
                name: '',
                url: '',
                id: '',
            },
        };
    },
    methods: {
        submitForm(event: any) {
            event.preventDefault();
            const newBookmark = { ...this.bookmarkForm, id: guid() };
            this.$emit('add-bookmark', newBookmark);
            this.resetForm();
        },
        resetForm() {
            this.bookmarkForm = { name: '', url: '', id: '' };
        },
    },
};
</script>

<style scoped></style>
