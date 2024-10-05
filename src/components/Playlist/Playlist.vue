<template>
    <BaseWidgetDraggable :title="`Playlist`">
        <template v-slot:widget>
            <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/674KGKRQBPE?si=07PH1zLMEEmkSlhQ"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
        </template>
    </BaseWidgetDraggable>
</template>

<script lang="ts">
import BaseWidgetDraggable from '../Draggable/BaseWidgetDraggable.vue';

export default {};
</script>

<style scoped lang="scss"></style>
