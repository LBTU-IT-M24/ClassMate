<template>
    <BTableSimple responsive>
        <BThead>
            <BTr>
                <BTh>Bookmark</BTh>
                <BTh class="text-center">Actions</BTh>
            </BTr>
        </BThead>
        <BTbody>
            <BTr v-for="bookmark in bookmarks" :key="bookmark.id">
                <BTd>
                    <BButton variant="link" @click="onBookmarkClick(bookmark.url)">
                        {{ bookmark.name }}
                    </BButton>
                </BTd>
                <BTd class="text-center">
                    <BButton
                        v-b-tooltip="`Remove`"
                        variant="danger"
                        class="float-right"
                        @click="removeBookmark(bookmark.id)"
                    >
                        X
                    </BButton>
                </BTd>
            </BTr>
        </BTbody>
    </BTableSimple>

    <BookmarkConfigurationToolsAdd @add-bookmark="addBookmark" />
</template>

<script lang="ts">
import type { IBookmarkModel } from './interfaces/IBookmarkModel';
import BookmarkConfigurationToolsAdd from './BookmarkConfigurationToolsAdd.vue';

export default {
    props: {
        bookmarks: {
            type: Array as () => IBookmarkModel[],
            required: true,
        },
    },
    methods: {
        onBookmarkClick(url: string) {
            window.open(url, '_blank');
        },
        addBookmark(newBookmark: IBookmarkModel) {
            const updatedBookmarks = [...this.bookmarks, newBookmark];
            // TODO remove from db
            this.emitBookmarks(updatedBookmarks);
        },
        removeBookmark(id: string) {
            const updatedBookmarks = this.bookmarks.filter((bookmark) => bookmark.id !== id);
            // TODO: remove from db
            this.emitBookmarks(updatedBookmarks);
        },
        emitBookmarks(updatedBookmarks: IBookmarkModel[]) {
            this.$emit('update:bookmarks', updatedBookmarks);
        },
    },
};
</script>
