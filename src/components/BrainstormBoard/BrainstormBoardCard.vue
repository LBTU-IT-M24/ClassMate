<template>
    <n-card
        :class="draggableClass"
        :style="draggableStyle"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
        @contextmenu.stop="() => {}"
    >
        <n-flex justify="space-between" class="user-select-none" style="pointer-events: none">
            <n-element>
                <div class="w-100 d-flex justify-content-center me-4">
                    <img
                        :src="`./${pushpinImagePath}`"
                        alt="pushpin"
                        class="img-fluid pushpin"
                        width="574"
                        height="434"
                    />
                </div>

                <div class="w-100">
                    <div class="h4" :style="textStyle">{{ card?.title }}</div>
                </div>

                <div class="w-100">
                    <div class="mt-4" :style="textStyle">{{ card?.content }}</div>
                </div>
            </n-element>
        </n-flex>

        <span
            v-for="connection in card?.connections"
            :key="`${card?.id}-connection-to-${connection.id}`"
            class="line"
            :style="getLineStyle(card ?? null, null, connection)"
            @mouseup.right="removeConnection($event, card ?? null, connection)"
        />
        <span v-if="selectedCard === card && scale === 1" class="line" :style="getLineStyle(selectedCard, true)" />
    </n-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { NButton, NRow, NCol, NCard, NFlex, NH2, NText, NElement } from 'naive-ui';
import type { BrainstormCard } from '@/stores/useBrainstormBoard';
import { mapState, mapStores } from 'pinia';
import { useBrainstormBoard } from '@/stores/useBrainstormBoard';
import { useGlobalSettings } from '@/stores/useGlobalSettings';

export default defineComponent({
    name: 'BrainstormBoardCard',
    components: { NElement, NText, NH2, NFlex, NCard, NButton, NRow, NCol },
    props: {
        card: {
            type: Object as PropType<BrainstormCard>,
            required: true,
        },
    },
    computed: {
        ...mapStores(useBrainstormBoard, useGlobalSettings),
        ...mapState(useGlobalSettings, ['isDarkMode']),
        ...mapState(useBrainstormBoard, ['scale', 'selectedCard', 'mouseX', 'mouseY', 'isConnectingMode']),

        pushpinImagePath() {
            return this.isDarkMode ? 'pushpin_green.png' : 'pushpin.png';
        },
        draggableClass() {
            if (this.isDarkMode) {
                return {
                    draggable: true,
                    'hovering-dark': this.card?.isSelected || this.card?.isHovering,
                };
            }

            return {
                draggable: true,
                'hovering-light': this.card?.isSelected || this.card?.isHovering,
            };
        },
        draggableStyle() {
            return {
                width: `${this.card?.width ?? 0}px`,
                height: `${this.card?.height ?? 0}px`,
                left: `${this.position.left}px`,
                top: `${this.position.top}px`,
                transform: `rotate(${this.card?.rotation}deg)`,
                transformOrigin: 'center',
                position: 'absolute',
                'background-color': this.isDarkMode ? 'var(--p-form-field-filled-hover-background)' : '#cfe5ff',
            };
        },
        textStyle() {
            return {
                color: this.isDarkMode ? 'var(--p-primary-500)' : '#000',
            };
        },
    },
    data() {
        return {
            isDragging: false,
            width: 200,
            height: 250,
            offsetX: 0,
            offsetY: 0,
            headerHeight: 67,
            position: {
                left: 0,
                top: 0,
            },
        };
    },
    beforeMount() {
        if (this.card && this.card.position.top === 0) {
            this.position.top = window.innerHeight / 2 - this.card.height / 2 + this.headerHeight;
        } else {
            this.position.top = this.card?.position?.top ?? 0;
        }

        if (this.card && this.card.position.left === 0) {
            this.position.left = window.innerWidth / 2 - this.card.width / 2;
        } else {
            this.position.left = this.card?.position?.left ?? 0;
        }

        this.updateCard(this.card ?? null);
    },
    methods: {
        removeConnection(event: MouseEvent, sourceCard: BrainstormCard | null, connectionCard: BrainstormCard | null) {
            if (!sourceCard || !connectionCard) {
                return;
            }

            const target = event.target as HTMLElement;
            if (target.classList.contains('line')) {
                event.preventDefault();
                setTimeout(() => {
                    sourceCard.connections = sourceCard.connections.filter((card) => card.id !== connectionCard.id);
                }, 10);
                return;
            }
        },
        getLineStyle(
            sourceCard: BrainstormCard | null,
            followCursor: any = null,
            targetCard: BrainstormCard | null = null,
        ): string {
            if (!sourceCard) {
                return '';
            }

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // ======= Width
            const sourcePointX = viewportWidth - (viewportWidth - (sourceCard.position.left + sourceCard.width / 2));
            const sourcePointY = viewportHeight - (viewportHeight - sourceCard.position.top) + sourceCard.height / 2;

            let targetPointX = 0;
            let targetPointY = 0;

            if (targetCard) {
                targetPointX = viewportWidth - (viewportWidth - (targetCard.position.left + targetCard.width / 2));
                targetPointY = viewportHeight - (viewportHeight - targetCard.position.top) + targetCard.height / 2;
            }

            if (followCursor) {
                targetPointX = this.mouseX - 110;
                targetPointY = this.mouseY + 10;
            }

            const width = Math.sqrt(
                Math.pow(targetPointX - sourcePointX, 2) + Math.pow(targetPointY - sourcePointY, 2),
            );

            // ======= Angle
            const radians = Math.atan2(targetPointY - sourcePointY, targetPointX - sourcePointX);

            const color = this.isDarkMode ? 'green' : 'red';
            const style = followCursor ? 'dashed' : 'solid';

            return `border: ${style} 3px ${color}; transform-origin: top left; width: ${width}px; transform: rotate(${radians * (180 / Math.PI) - (sourceCard?.rotation ?? 0)}deg);`;
        },
        onMouseDown(event: MouseEvent) {
            if (this.isConnectingMode) {
                return;
            }

            this.isDragging = true;
            const scaledLeft = this.position.left * this.scale;
            const scaledTop = this.position.top * this.scale;

            this.offsetX = event.clientX - scaledLeft;
            this.offsetY = event.clientY - scaledTop;

            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
        },
        onMouseMove(event: MouseEvent) {
            if (this.isDragging) {
                let newLeft = (event.clientX - this.offsetX) / this.scale;
                let newTop = (event.clientY - this.offsetY) / this.scale;

                this.position.left = newLeft;
                this.position.top = newTop;
            }
        },
        onMouseUp() {
            this.isDragging = false;
            document.removeEventListener('mousemove', this.onMouseMove);
        },
        updateCard(card: BrainstormCard | null) {
            if (!card) {
                return;
            }

            card.isDragging = this.isDragging;
            card.width = this.card?.width ?? 0;
            card.height = this.card?.height ?? 0;
            card.offsetX = this.offsetX;
            card.offsetY = this.offsetY;
            card.headerHeight = this.headerHeight;
            card.position = this.position;
        },
    },
});
</script>

<style lang="scss" scoped>
.draggable {
    position: relative;
    cursor: grab;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
        background-color 0.3s,
        transform 0.2s ease;
    user-select: none;
    z-index: 12;
}
.draggable:active {
    cursor: grabbing;
}
.line {
    height: 3px;
    position: absolute;
    top: 20%;
    left: 50%;
    z-index: 9;
}
.line-preview {
    height: 1px;
    user-select: none;
    pointer-events: none;
    position: absolute;
    z-index: 10;
}
.pushpin {
    z-index: 10;
    width: 60%;
}
.hovering-light {
    border: 1px solid #000;
}
.hovering-dark {
    border: 1px solid var(--p-primary-500);
}
</style>
