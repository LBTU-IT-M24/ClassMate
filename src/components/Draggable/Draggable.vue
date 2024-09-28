<template id="draggable">
    <div ref="el" class="draggable__body" :style="style">
        <!-- For testing purposes -->
        <!-- <pre>{{ position }}</pre> -->
        <slot></slot>
    </div>
</template>

<script lang="ts">
import type { IDraggablePosition } from './interfaces/IDraggablePosition';
import type { IDraggableStyle } from './interfaces/IDraggableStyle';

interface IDraggableData {
    position: IDraggablePosition;
}

export default {
    props: {
        initialX: {
            type: Number,
            default: 0,
        },
        initialY: {
            type: Number,
            default: 0,
        },
    },
    data(): IDraggableData {
        return {
            position: {
                init: false,
                x: this.initialX,
                y: this.initialY,
                width: 0,
                height: 0,
                isDraging: false,
                dragStartX: null,
                dragStartY: null,
            },
        };
    },
    computed: {
        style() {
            const basePosition = {
                position: 'absolute',
                left: this.position.x + 'px',
                top: this.position.y + 'px',
                'box-shadow': this.position.isDraging ? '3px 6px 16px rgba(0, 0, 0, 0.15)' : '',
                transform: this.position.isDraging ? 'translate(-3px, -6px)' : '',
                cursor: this.position.isDraging ? 'grab' : 'pointer',
            } as IDraggableStyle;

            if (this.position.init) {
                return {
                    ...basePosition,
                    width: this.position.width + 'px',
                };
            }

            return basePosition;
        },
    },
    mounted() {
        const el = this.$refs.el;
        if (el instanceof HTMLElement) {
            let rect = el.getBoundingClientRect();
            this.position.init = true;
            this.position.x = Math.round(rect.x);
            this.position.y = Math.round(rect.y);
            this.position.width = Math.round(rect.width);
            this.position.height = Math.round(rect.height);

            el.addEventListener('mousedown', this.onMouseDown);
        }
    },
    methods: {
        onMouseDown(e: MouseEvent) {
            e.stopPropagation();
            const { clientX, clientY } = e;
            this.position.dragStartX = clientX - this.position.x;
            this.position.dragStartY = clientY - this.position.y;

            this.position.isDraging = true;

            document.addEventListener('mouseup', this.onMouseUp);
            document.addEventListener('mousemove', this.onMouseMove);
        },
        onMouseMove(e: MouseEvent) {
            e.stopPropagation();
            const { clientX, clientY } = e;

            const newXPos = clientX - (this.position.dragStartX || 0);
            const newYPos = clientY - (this.position.dragStartY || 0);

            this.position.x = newXPos;
            this.position.y = newYPos;
        },
        onMouseUp(e: MouseEvent) {
            e.stopPropagation();
            this.position.isDraging = false;
            this.position.dragStartX = null;
            this.position.dragStartY = null;
            document.removeEventListener('mouseup', this.onMouseUp);
            document.removeEventListener('mousemove', this.onMouseMove);
        },
    },
    template: document?.getElementById('draggable')?.innerHTML,
};
</script>

<style scoped lang="scss">
.draggable {
    &__body {
        display: inline-block;
        margin: 0;
        color: rgb(6, 19, 29);
        background-color: rgb(187, 195, 209);
        border-radius: 16px;
        padding: 16px;
        touch-action: none;
        user-select: none;
        -webkit-transform: translate(0px, 0px);
        transform: translate(0px, 0px);
        transition:
            transform 0.1s ease-in,
            box-shadow 0.1s ease-out;
        border: 1px solid rgb(6, 19, 29);
    }
}

pre {
    display: inline-block;
    overflow: hidden;
    font-size: 10px;
}
</style>
