<template>
    <BaseWidgetDraggable
        style="width: 500px"
        :title="`Playlist`"
        :type="ComponentTypes.PLAYLIST"
        @update-position="$emit('update-position')"
    >
        <template v-slot:widget>
            <div v-if="playlists?.length" class="playlist-container">
                <iframe :src="iframeSrc" allow="encrypted-media" class="spotify-embed"></iframe>
            </div>

            <div v-else class="empty-message">You need to add a playlist!</div>

            <n-flex justify="center" class="mt-3">
                <n-button @click="prevPlaylist" strong info>Previous</n-button>
                <n-button @click="nextPlaylist" strong info>Next</n-button>
            </n-flex>
        </template>

        <template v-slot:styleConfiguration>
            <PlaylistConfiguration :playlists="playlists" />
        </template>
    </BaseWidgetDraggable>
</template>

<script setup lang="ts">
import { ref, computed, provide } from 'vue';
import { ComponentTypes } from '@/enums/ComponentTypes';
import PlaylistConfiguration from '@/components/Playlist/PlaylistConfiguration.vue';
import { type Playlist } from './interfaces/Playlist';
import { NButton, NFlex } from 'naive-ui';

const playlists = ref<Playlist[]>([
    { url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWXRqgorJj26U' },
    { url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M' },
    { url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd' },
]);

const disabledOptions = {
    isOpacityDisabled: false,
    isFontSizeDisabled: true,
    isBackgroundColorDisabled: false,
};

provide('disabledOptions', disabledOptions);

const currentIndex = ref(0);

const iframeSrc = computed(() => {
    return playlists.value[currentIndex.value]?.url;
});

const prevPlaylist = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
    } else {
        currentIndex.value = playlists.value.length - 1;
    }
};

const nextPlaylist = () => {
    if (currentIndex.value < playlists.value.length - 1) {
        currentIndex.value++;
    } else {
        currentIndex.value = 0;
    }
};
</script>

<style scoped lang="scss">
.spotify-embed {
    width: 100%;
    height: 600px;
    border: none;
}
.playlist-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.empty-message {
    text-align: center;
    font-size: 1.2rem;
    color: #ff4d4f;
    margin-top: 20px;
}
</style>
