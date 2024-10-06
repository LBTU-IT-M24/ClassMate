<template>
    <n-form ref="formRef" :label-width="80" :model="bookmarkForm" :rules="rules">
        <n-form-item label="Name" path="name">
            <n-input v-model:value="bookmarkForm.name" placeholder="Input Name" />
        </n-form-item>
        <n-form-item label="Url" path="url">
            <n-input v-model:value="bookmarkForm.url" placeholder="Input Url" />
        </n-form-item>
        <n-row :gutter="[0, 24]">
            <n-col :span="24">
                <n-button @click="closeForm" strong secondary> Cancel </n-button>

                <n-button @click="submitForm" strong secondary type="primary" style="float: right"> Add </n-button>
            </n-col>
        </n-row>
    </n-form>
</template>

<script lang="ts">
import { guid } from '@/helpers/Random/guid';
import type { IBookmarkModel } from './interfaces/IBookmarkModel';
import {
    NDrawer,
    NDrawerContent,
    NForm,
    NFormItem,
    NButton,
    NInput,
    type FormInst,
    NRow,
    NCol,
    type FormItemRule,
} from 'naive-ui';

export interface IBookmarkConfigurationToolsAdd {
    bookmarkForm: IBookmarkModel;
    showDrawer: boolean;
}

export default {
    components: {
        NDrawer,
        NDrawerContent,
        NForm,
        NFormItem,
        NButton,
        NInput,
        NRow,
        NCol,
    },
    data() {
        return {
            formRef: null as FormInst | null,
            bookmarkForm: {
                name: '',
                url: '',
                id: '',
            },
            showDrawer: false,
            rules: {
                name: {
                    required: true,
                    message: 'Please input bookmark name',
                    trigger: 'blur',
                },
                url: {
                    required: true,
                    validator(_rule: FormItemRule, value: string) {
                        if (!value) {
                            return new Error('Please input bookmark url');
                        } else if (
                            // Reference: https://regexr.com/39nr7
                            !/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
                                value,
                            )
                        ) {
                            return new Error('Url is not valid');
                        }
                        return true;
                    },
                    trigger: ['input', 'blur'],
                },
            },
        };
    },
    methods: {
        async submitForm(event: any) {
            event.preventDefault();
            if (!(await this.isValid())) {
                return;
            }
            const newBookmark = { ...this.bookmarkForm, id: guid() };
            this.$emit('add-bookmark', newBookmark);
            this.closeForm();
            this.resetForm();
        },
        resetForm() {
            this.bookmarkForm = { name: '', url: '', id: '' };
        },
        closeForm() {
            this.$emit('handle-add-form', false);
        },
        async isValid(): Promise<boolean> {
            return new Promise((resolve) => {
                this.formRef?.validate((errors) => {
                    resolve(!errors);
                });
            });
        },
    },
    mounted() {
        this.formRef = this.$refs.formRef as FormInst;
    },
};
</script>

<style scoped></style>
