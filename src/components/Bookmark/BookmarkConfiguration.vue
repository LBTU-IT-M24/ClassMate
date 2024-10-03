<template>
    <BTabs class="configuration">
        <BTab title="Tools">
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
        </BTab>

        <BTab title="View">
            <div class="m-3">
                <Label :text="`Transparency`" class="mb-3" />
                <Slider
                    v-model="bookmarkStyleConfiguration.transparency"
                    :min="30"
                    :step="1"
                    :max="100"
                    class="w-full"
                />
                <BRow>
                    <BCol>30</BCol>
                    <BCol class="text-center">{{ bookmarkStyleConfiguration.transparency }}</BCol>
                    <BCol class="text-end">100</BCol>
                </BRow>
            </div>
            <div class="m-3">
                <Label :text="`Font size (px)`" class="mb-3" />
                <Slider v-model="bookmarkStyleConfiguration.fontSize" :min="12" :step="1" :max="20" class="w-full" />
                <BRow>
                    <BCol>12</BCol>
                    <BCol class="text-center">{{ bookmarkStyleConfiguration.fontSize }}</BCol>
                    <BCol class="text-end">20</BCol>
                </BRow>
            </div>
            <div class="m-3">
                <Label :text="`Background color`" class="mb-3" />
                <ColorPicker v-model="bookmarkStyleConfiguration.color" panelClass="bookmarks__colorpicker" />
            </div>
        </BTab>
    </BTabs>
</template>

<script lang="ts">
import ColorPicker from 'primevue/colorpicker';
import type { IBookmarkModel } from './interfaces/IBookmarkModel';
import BookmarkConfigurationToolsAdd from './BookmarkConfigurationToolsAdd.vue';
import type { IStyleConfiguration } from '../../models/StyleConfiguration/IStyleConfiguration';

export default {
    props: {
        bookmarks: {
            type: Array as () => IBookmarkModel[],
            required: true,
        },
        bookmarkStyleConfiguration: {
            type: Object as () => Partial<IStyleConfiguration>,
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
    unmounted() {
        console.log('hit');
    },
};
</script>
