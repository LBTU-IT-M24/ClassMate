<template>
    <n-config-provider v-if="!showAddForm">
        <n-button size="small" class="mb-3" strong secondary @click="handleAddForm(true)"> Add bookmark </n-button>
        <n-data-table :columns="columns" :data="bookmarks" :bordered="false" />
    </n-config-provider>

    <BookmarkConfigurationToolsAdd v-else @add-bookmark="addBookmark" @handle-add-form="handleAddForm" />
</template>

<script lang="ts">
import { h } from 'vue';
import type { IBookmarkModel } from './interfaces/IBookmarkModel';
import { NDataTable, NButton, NConfigProvider, NDrawer, NDrawerContent, type DataTableColumns } from 'naive-ui';

export interface IBookmarkConfigurationData {
    columns: DataTableColumns<IBookmarkModel>;
    showAddForm: boolean;
}

export default {
    components: {
        NDataTable,
        NButton,
        NConfigProvider,
        NDrawer,
        NDrawerContent,
    },
    props: {
        bookmarks: {
            type: Array as () => IBookmarkModel[],
            required: true,
        },
    },
    data(): IBookmarkConfigurationData {
        return {
            columns: [],
            showAddForm: false,
        };
    },
    created() {
        this.columns = this.createColumns();
    },
    methods: {
        onBookmarkClick(url: string) {
            window.open(url, '_blank');
        },
        handleAddForm(value: boolean) {
            this.showAddForm = value;
        },
        addBookmark(newBookmark: IBookmarkModel) {
            const updatedBookmarks = [...this.bookmarks, newBookmark];
            this.emitBookmarks(updatedBookmarks);
        },
        removeBookmark(id: string) {
            const updatedBookmarks = this.bookmarks.filter((bookmark) => bookmark.id !== id);
            this.emitBookmarks(updatedBookmarks);
        },
        emitBookmarks(updatedBookmarks: IBookmarkModel[]) {
            this.$emit('update:bookmarks', updatedBookmarks);
        },
        createColumns(): DataTableColumns<IBookmarkModel> {
            return [
                {
                    title: 'Bookmark',
                    key: 'name',
                    render: ({ name, url }: IBookmarkModel) => {
                        return h(
                            NButton,
                            {
                                strong: true,
                                size: 'small',
                                onClick: () => this.onBookmarkClick(url),
                                text: true,
                                type: 'info',
                                style: 'text-decoration: underline',
                            },
                            { default: () => name },
                        );
                    },
                },
                {
                    title: 'Action',
                    key: 'actions',
                    render: ({ id }: IBookmarkModel) => {
                        return h(
                            NButton,
                            {
                                strong: true,
                                tertiary: true,
                                size: 'small',
                                onClick: () => this.removeBookmark(id),
                                type: 'error',
                                secondary: true,
                            },
                            { default: () => 'Remove' },
                        );
                    },
                },
            ];
        },
    },
};
</script>
