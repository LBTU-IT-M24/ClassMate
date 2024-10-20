<template>
    <BaseWidgetDraggable
        :title="`Bookmarks`"
        :type="ComponentTypes.BOOKMARKS"
        @update-position="$emit('update-position')"
    >
        <template v-slot:widget>
            <div class="d-flex flex-column bookmarks h-100">
                <n-flex>
                    <n-button
                        v-for="{ url, name } in bookmarks"
                        class="bookmarks__link-button"
                        text-color="white"
                        type="primary"
                        round
                        @click="onBookmarkClick(url)"
                    >
                        {{ name }}
                    </n-button>
                </n-flex>
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
import { ComponentTypes } from '@/enums/ComponentTypes';
import BookmarkConfiguration from '@/components/Bookmark/BookmarkConfiguration.vue';
import { NButton, NRow, NCol } from 'naive-ui';

export interface IBookmarksData {
    bookmarks: IBookmarkModel[];
}

export default {
    components: { BookmarkConfiguration, NButton, NRow, NCol },
    computed: {
        ComponentTypes() {
            return ComponentTypes;
        },
    },
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

    &__link-button {
        font-size: inherit;
    }
}
</style>
