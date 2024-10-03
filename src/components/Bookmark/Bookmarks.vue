<template>
    <div class="bookmark-widget" :style="computedStyle">
        <h4>Bookmarks</h4>
        <div class="d-flex flex-column bookmarks h-100">
            <BRow>
                <BButton
                    variant="link"
                    v-for="bookmark in bookmarks"
                    @click="() => onBookmarkClick(bookmark.url)"
                    style="font-size: inherit"
                >
                    {{ bookmark.name }}
                </BButton>
            </BRow>

            <BRow class="bookmarks__configuration">
                <BCol
                    ><BButton @click="isModalOpen = true" v-b-tooltip="`Open configuration`"
                        ><font-awesome-icon :icon="['fas', 'cog']" /></BButton
                ></BCol>
            </BRow>

            <BModal
                v-model="isModalOpen"
                hide-footer
                class="dialog-content"
                :title="`Bookmark Settings`"
                @close="updateConfiguration"
            >
                <BookmarkConfiguration
                    v-model:bookmarks="bookmarks"
                    v-model:bookmarkStyleConfiguration="bookmarkStyleConfiguration"
                />
            </BModal>
        </div>
    </div>
</template>

<script lang="ts">
import type { IStyleConfiguration } from '../../models/StyleConfiguration/IStyleConfiguration';
import BookmarkConfiguration from './BookmarkConfiguration.vue';
import type { IBookmarkModel } from './interfaces/IBookmarkModel';
import { guid } from '@/helpers/Random/guid';

export interface IBookmarksData {
    bookmarks: IBookmarkModel[];
    isModalOpen: boolean;
    bookmarkStyleConfiguration: IStyleConfiguration;
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
            isModalOpen: false,
            bookmarkStyleConfiguration: { transparency: 100, color: 'FFFFFF', fontSize: 13 },
        };
    },
    methods: {
        onBookmarkClick(url: string) {
            window.open(url, '_blank');
        },
        updateConfiguration() {
            console.log(this.bookmarkStyleConfiguration);
            // TODO: update style
        },
    },
    computed: {
        computedStyle() {
            const { transparency, color, fontSize } = this.bookmarkStyleConfiguration;
            return {
                opacity: transparency / 100,
                backgroundColor: `#${color}`,
                fontSize: `${fontSize}px`,
            };
        },
    },
    mounted() {
        // TODO fetch and set initial data
    },
};
</script>

<style lang="scss">
.bookmark-widget {
    border-radius: var(--bs-border-radius) !important;
    --bs-bg-opacity: 1;
    background-color: rgba(var(--bs-light-rgb), var(--bs-bg-opacity));
    box-shadow: var(--bs-box-shadow) !important;
    display: flex !important;
    flex-direction: column;
    margin: 0px auto;
    padding: 1rem;
    height: 500px;
    overflow: auto;
}

.bookmarks {
    &__configuration {
        text-align: right;
        align-items: end;
        height: 100%;
    }
}

.bookmarks__colorpicker {
    z-index: 9999 !important;
}
</style>
