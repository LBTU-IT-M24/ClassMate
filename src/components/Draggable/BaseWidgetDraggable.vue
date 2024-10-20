<template id="base-widget-draggable">
    <div ref="el" class="base-widget-draggable__body" :style="{ ...style, position: 'absolute' }">
        <n-element>
            <div class="widget" :style="widgetStyle">
                <div class="d-flex pb-2 widget__header">
                    <h4>{{ title }}</h4>
                </div>
                <slot name="widget"></slot>
                <div class="widget__configuration">
                    <div v-if="isTeacher" style="display: flex; justify-content: flex-end">
                        <n-tooltip>
                            <template #trigger>
                                <n-button @click="isModalOpen = true" text class="widget__configuration__button">
                                    <font-awesome-icon :icon="['fas', 'cog']" />
                                </n-button>
                            </template>
                            Open configuration
                        </n-tooltip>
                    </div>
                </div>
            </div>
            <div>
                <n-modal v-model:show="isModalOpen">
                    <n-card
                        style="width: 600px"
                        :title="`${title} Settings`"
                        :bordered="false"
                        size="huge"
                        role="dialog"
                    >
                        <StyleConfiguration :styleConfiguration="styleConfiguration">
                            <template v-slot:customTabs v-if="$slots.styleConfiguration">
                                <slot name="styleConfiguration"></slot>
                            </template>
                        </StyleConfiguration>
                    </n-card>
                </n-modal>
            </div>
        </n-element>
    </div>
</template>
<script lang="ts">
import type { IStyleConfiguration } from '@/models/StyleConfiguration/IStyleConfiguration';
import type { IDraggablePosition } from './interfaces/IDraggablePosition';
import { getDefaultConfiguration } from '../StyleConfiguration/helpers/DefaultConfiguration';
import { NModal, NCard, NButton, NElement, NTooltip } from 'naive-ui';
import { mapState } from 'pinia';
import { useAuth } from '@/stores/useAuth';

interface IDraggableData {
    position: IDraggablePosition;
    styleConfiguration: IStyleConfiguration;
    isModalOpen: boolean;
}

const HEIGHT_BOUNDRY_LIMIT = -50;
const WIDTH_BOUNDRY_LIMIT = -100;

export default {
    components: {
        NModal,
        NCard,
        NButton,
        NElement,
        NTooltip,
    },
    props: {
        initialX: {
            type: Number,
            default: 0,
        },
        initialY: {
            type: Number,
            default: 0,
        },
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        initialPosition: {
            type: Object,
            required: true,
        },
    },
    data(): IDraggableData {
        return <IDraggableData>{
            position: this.initialPosition,
            styleConfiguration: {} as IStyleConfiguration,
            isModalOpen: false,
        };
    },
    computed: {
        style() {
            const basePosition = {
                left: this.position.x + 'px',
                top: this.position.y + 'px',
                boxShadow: this.position.isDragging ? '3px 6px 16px rgba(0, 0, 0, 0.15)' : '',
                transform: this.position.isDragging ? 'translate(-3px, -6px)' : '',
                cursor: this.position.isDragging ? 'grab' : 'pointer',
            };

            if (this.position.init) {
                return {
                    ...basePosition,
                    width: this.position.width + 'px',
                };
            }

            return basePosition;
        },
        widgetStyle() {
            const { transparency, color, fontSize } = this.styleConfiguration;

            return {
                opacity: transparency / 100,
                backgroundColor: `${color}`,
                fontSize: `${fontSize}px`,
            };
        },
        ...mapState(useAuth, ['isTeacher']),
    },
    mounted() {
        const position = this.position;
        const props = this.$props;

        const el = this.$refs.el;
        if (el instanceof HTMLElement) {
            let rect = el.getBoundingClientRect();
            position.init = true;
            position.x = Math.round(rect.x);
            position.y = Math.round(rect.y);
            position.width = Math.round(rect.width);
            position.height = Math.round(rect.height);

            el.addEventListener('mousedown', this.onMouseDown);
        }

        this.styleConfiguration = getDefaultConfiguration();

        if (position.x === 0) {
            position.x = (window.innerWidth - position.width) / 2;
        }
        if (position.y === 0) {
            position.y = (window.innerHeight - position.height) / 2;
        }
    },
    beforeUnmount() {
        this.$emit('update-position', { type: this.type, position: this.position });
    },
    methods: {
        onMouseDown(e: MouseEvent) {
            const element = e.target as HTMLInputElement;
            if (
                (!element?.classList?.contains('widget__header') &&
                    !element?.classList?.contains('widget') &&
                    element?.nodeName !== 'H4') ||
                element?.nodeName === 'BUTTON' ||
                element?.nodeName === 'path' ||
                element?.nodeName === 'svg'
            ) {
                return;
            }

            e.stopPropagation();

            const { clientX, clientY } = e;
            this.position.dragStartX = clientX - this.position.x;
            this.position.dragStartY = clientY - this.position.y;

            this.position.isDragging = true;

            document.addEventListener('mouseup', this.onMouseUp);
            document.addEventListener('mousemove', this.onMouseMove);
        },
        onMouseMove(e: MouseEvent) {
            e.stopPropagation();
            const { clientX, clientY } = e;

            const dragStartX = this.position.dragStartX || 0;

            const widthLimit = window.innerWidth + -WIDTH_BOUNDRY_LIMIT;

            const newXPos = clientX - dragStartX;
            if (newXPos < WIDTH_BOUNDRY_LIMIT || newXPos + this.position.width > widthLimit) {
                return;
            }

            const dragStartY = this.position.dragStartY || 0;
            const newYPos = clientY - dragStartY;
            const heightLimit = window.innerHeight + -HEIGHT_BOUNDRY_LIMIT;
            if (newYPos < HEIGHT_BOUNDRY_LIMIT || newYPos + this.position.height > heightLimit) {
                return;
            }

            this.position.x = newXPos;
            this.position.y = newYPos;
        },
        onMouseUp(e: MouseEvent) {
            e.stopPropagation();
            this.position.isDragging = false;
            this.position.dragStartX = null;
            this.position.dragStartY = null;
            document.removeEventListener('mouseup', this.onMouseUp);
            document.removeEventListener('mousemove', this.onMouseMove);
        },
    },
    template: document?.getElementById('base-widget-draggable')?.innerHTML,
};
</script>

<style scoped lang="scss">
.widget {
    border-radius: var(--bs-border-radius) !important;
    --bs-bg-opacity: 1;
    background-color: var(--modal-color);
    box-shadow: var(--bs-box-shadow) !important;
    display: flex !important;
    flex-direction: column;
    margin: 0 auto;
    padding: 1rem;
    overflow: auto;

    &__configuration {
        position: relative;
        margin-top: 1rem;
        display: flex;
        justify-content: flex-end;
    }

    &__header {
        justify-content: space-between;
    }
}

.base-widget-draggable {
    &__body {
        display: inline-block;
        margin: 0;
        border-radius: 16px;
        touch-action: none;
        user-select: none;
        -webkit-transform: translate(0px, 0px);
        transform: translate(0px, 0px);
        transition:
            transform 0.1s ease-in,
            box-shadow 0.1s ease-out;
        min-width: 250px;
    }
}

pre {
    display: inline-block;
    overflow: hidden;
    font-size: 10px;
}
</style>
