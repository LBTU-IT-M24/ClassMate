<template id="base-widget-draggable">
    <div ref="el" class="base-widget-draggable__body" :style="{ ...style, position: 'absolute' }">
        <div class="widget" :style="widgetStyle">
            <div class="d-flex pb-2 widget__header">
                <div>
                    <h4>{{ title }}</h4>
                </div>
                <div>
                    <BButton
                        @click="isModalOpen = true"
                        v-b-tooltip="`Open configuration`"
                        class="d-flex widget__configuration__button"
                    >
                        <font-awesome-icon :icon="['fas', 'cog']" />
                    </BButton>
                </div>
            </div>

            <slot name="widget"></slot>
        </div>
        <div>
            <n-modal v-model:show="isModalOpen">
                <n-card style="width: 600px" :title="`${title} Settings`" :bordered="false" size="huge" role="dialog">
                    <StyleConfiguration :styleConfiguration="styleConfiguration">
                        <template v-slot:customTabs v-if="$slots.styleConfiguration">
                            <slot name="styleConfiguration"></slot>
                        </template>
                    </StyleConfiguration>
                </n-card>
            </n-modal>
        </div>
    </div>
</template>

<script lang="ts">
import type { IStyleConfiguration } from '@/models/StyleConfiguration/IStyleConfiguration';
import type { IDraggablePosition } from './interfaces/IDraggablePosition';
import { getDefaultConfiguration } from '../StyleConfiguration/helpers/DefaultConfiguration';
import { NModal, NCard } from 'naive-ui';

interface IDraggableData {
    position: IDraggablePosition;
    styleConfiguration: IStyleConfiguration;
    isModalOpen: boolean;
}

export default {
    components: {
        NModal,
        NCard,
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
            styleConfiguration: {} as IStyleConfiguration,
            isModalOpen: false,
        };
    },
    computed: {
        style() {
            const basePosition = {
                left: this.position.x + 'px',
                top: this.position.y + 'px',
                boxShadow: this.position.isDraging ? '3px 6px 16px rgba(0, 0, 0, 0.15)' : '',
                transform: this.position.isDraging ? 'translate(-3px, -6px)' : '',
                cursor: this.position.isDraging ? 'grab' : 'pointer',
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
                backgroundColor: `#${color}`,
                fontSize: `${fontSize}px`,
            };
        },
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

        if (!props.initialX) {
            position.x = (window.innerWidth - position.width) / 2;
        }
        if (!props.initialY) {
            position.y = (window.innerHeight - position.height) / 2;
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
        updateConfiguration() {
            // TODO: update style
        },
    },
    template: document?.getElementById('base-widget-draggable')?.innerHTML,
};
</script>

<style scoped lang="scss">
.widget {
    border-radius: var(--bs-border-radius) !important;
    --bs-bg-opacity: 1;
    background-color: rgba(var(--bs-light-rgb), var(--bs-bg-opacity));
    box-shadow: var(--bs-box-shadow) !important;
    display: flex !important;
    flex-direction: column;
    margin: 0px auto;
    padding: 1rem;
    overflow: auto;

    &__configuration {
        &__button {
            float: right;
        }

        &__title {
            float: left;
        }
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
