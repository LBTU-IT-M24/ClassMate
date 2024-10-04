<template>
    <BaseWidgetDraggable :title="`Bookmarks`">
        <template v-slot:widget>
            <div class="d-flex flex-column bookmarks h-100">
                <BRow>
                    <BButton
                        variant="link"
                        v-for="bookmark in bookmarks"
                        @click="onBookmarkClick(bookmark.url)"
                        style="font-size: inherit"
                    >
                        {{ bookmark.name }}
                    </BButton>
                </BRow>
            </div>
        </template>
        <template v-slot:styleConfiguration>
            <BookmarkConfiguration v-model:bookmarks="bookmarks" />
        </template>
    </BaseWidgetDraggable>
</template>

<script lang="ts">
import type { IBookmarkModel } from './interfaces/IBookmarkModel';
import { guid } from '@/helpers/Random/guid';

export interface IBookmarksData {
    bookmarks: IBookmarkModel[];
}

export default {
    data(): IBookmarksData {
        return {
            bookmarks: [
                {
                    name: 'E-klase.lv',
                    url: 'https://www.e-klase.lv/',
                    id: guid(),
                },
            ],
        };
    },
    methods: {
        onBookmarkClick(url: string) {
            window.open(url, '_blank');
        },
        updateConfiguration() {
            // TODO: update style
        },
    },
    mounted() {
        // TODO fetch and set initial data
    },
};
</script>

<style lang="scss">
.bookmarks {
    &__configuration {
        text-align: right;
        align-items: end;
        height: 100%;
    }
}
</style>
