<template>
    <n-page-header class="w-100 p-3 border-bottom">
        <template #title>
            <RouterLink to="/">
                <n-h2 class="mb-0">
                    <n-gradient-text
                        gradient="
                        {
                          deg: 180,
                          from: 'rgb(164, 200, 225)',
                          to: 'rgb(244, 200, 212)',
                        }"
                    >
                        Brainstorm Board
                    </n-gradient-text>
                </n-h2>
            </RouterLink>
        </template>
        <template #extra>
            <button class="btn btn-outline-secondary" @click="showOptions = !showOptions">
                <IconSettings />
            </button>

            <n-drawer :show="showOptions" :width="350" placement="right" @update-show="showOptions = !showOptions">
                <n-drawer-content title="Workspace settings">
                    <template #header>
                        <n-flex justify="space-between">
                            Workspace settings
                            <n-button v-if="isAuthorized" text @click="signOutUser">
                                Logout &nbsp; <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
                            </n-button> </n-flex
                    ></template>
                    <n-tabs type="line" animated>
                        <n-tab-pane name="view" tab="View"> <NavConfigurationTools /> </n-tab-pane>
                    </n-tabs>
                    <template #footer>
                        <RouterLink to="/">
                            <n-button>Personal Board</n-button>
                        </RouterLink>
                    </template>
                </n-drawer-content>
            </n-drawer>
        </template>
    </n-page-header>

    <n-layout has-sider style="height: calc(100% - 72px)">
        <n-layout-sider
            bordered
            width="100"
            show-trigger="bar"
            collapse-mode="width"
            :collapsed-width="0"
            :show-collapsed-content="false"
        >
            <n-flex justify="center" align="stretch" class="h-100">
                <div>
                    <n-flex justify="center" class="mt-4 gap-4">
                        <n-tooltip trigger="hover">
                            <template #trigger>
                                <n-button class="p-4" @click="showAddingModal = true">
                                    <font-awesome-icon :icon="['fas', 'plus']" size="2xl" style="color: #4db67e" />
                                </n-button>
                            </template>
                            Add new card
                        </n-tooltip>
                        <n-tooltip trigger="hover">
                            <template #trigger>
                                <n-button class="p-4" @click="startConnecting">
                                    <font-awesome-icon
                                        :icon="['fas', 'arrows-left-right']"
                                        size="2xl"
                                        style="color: #4db67e"
                                    />
                                </n-button>
                            </template>
                            Create connection
                        </n-tooltip>
                    </n-flex>
                </div>
                <div class="d-flex align-items-end mb-4">
                    <n-tooltip trigger="hover">
                        <template #trigger>
                            <n-button class="p-4" @click="removeAll">
                                <font-awesome-icon :icon="['fas', 'trash']" size="2xl" style="color: #4db67e" />
                            </n-button>
                        </template>
                        Remove all cards
                    </n-tooltip>
                </div>
            </n-flex>
        </n-layout-sider>
        <n-layout>
            <n-layout-content
                ref="board"
                class="card-boar woosh_background"
                :style="layoutStyle"
                @mousemove="preserveMousePosition"
                @mousedown="onMouseDown"
                @mouseup="onMouseUp"
                @wheel="wheel"
                @contextmenu.stop="() => {}"
            >
                <div ref="content" class="inner-board" :style="boardStyle">
                    <BrainstormBoardCard
                        v-for="card in cards"
                        :key="card.id"
                        :card="card"
                        @contextmenu.prevent="() => {}"
                        @mouseenter="hoverCard(true, card)"
                        @mouseleave="hoverCard(false)"
                        @click="cardClick(card)"
                        @dblclick="editCardData(card)"
                    />
                </div>
            </n-layout-content>
        </n-layout>
    </n-layout>

    <transition name="fade" mode="out-in">
        <n-space v-if="isConnectingMode" vertical class="steps">
            <n-steps :current="currentConnectingStep as number">
                <n-step title="Start" description="Click on any card to start connection from" />
                <n-step title="Plan" description="Take you time to find what card to connect with" />
                <n-step title="Connect" description="Click on desired card to create a connection" />
            </n-steps>
        </n-space>
    </transition>

    <n-modal v-model:show="showAddingModal" :on-after-leave="clearCardData">
        <n-card style="width: 600px" title="Add new card" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <n-space vertical>
                <n-input v-model:value="newCardTitle" type="text" placeholder="Card title" />
                <n-input v-model:value="newCardValue" type="textarea" placeholder="Card description" />
            </n-space>
            <template #footer>
                <n-space justify="space-between">
                    <n-button type="tertiary" @click="showAddingModal = false">Close</n-button>
                    <n-button v-if="isEdit" type="error" @click="removeCard">Delete</n-button>
                    <n-button v-if="isEdit" type="primary" @click="updateCard">Update</n-button>
                    <n-button v-else type="primary" @click="addCard">Add</n-button>
                </n-space>
            </template>
        </n-card>
    </n-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
    NButton,
    NCard,
    NDrawer,
    NDrawerContent,
    NFlex,
    NGradientText,
    NH1,
    NH2,
    NInput,
    NLayout,
    NLayoutContent,
    NLayoutFooter,
    NLayoutHeader,
    NLayoutSider,
    NModal,
    NPageHeader,
    NSpace,
    NStep,
    NSteps,
    NSwitch,
    NTabPane,
    NTabs,
    NTooltip,
    useNotification,
} from 'naive-ui';
import IconSettings from '@/components/icons/IconClock.vue';
import NavConfigurationModal from '@/App/Navbar/NavConfigurationModal.vue';
import { mapActions, mapState, mapStores } from 'pinia';
import { useAuth } from '@/stores/useAuth';
import BrainstormBoardCard from '@/components/BrainstormBoard/BrainstormBoardCard.vue';
import { useBrainstormBoard } from '@/stores/useBrainstormBoard';
import type { BrainstormCard } from '@/stores/useBrainstormBoard';
import { useGlobalSettings } from '@/stores/useGlobalSettings';
import { guid } from '@/helpers/Random/guid';
import NavConfigurationTools from '@/App/Navbar/NavConfigurationTools.vue';
import router from '@/router';

interface BrainstormBoardViewData {
    hoveredCard?: BrainstormCard | null;
    isHoveringCard: boolean;
    isEdit: boolean;
    showOptions: boolean;
    editingCard: BrainstormCard | null;
    currentConnectingStep: number;
    newCardTitle: string;
    newCardValue: string;
    showAddingModal: boolean;
    isDragging: boolean;
    startX: number;
    startY: number;
    cursorX: number;
    cursorY: number;
    x: number;
    y: number;
}

export default defineComponent({
    name: 'BrainstormBoard',
    components: {
        NTabPane,
        NTabs,
        NDrawer,
        NDrawerContent,
        NSwitch,
        NavConfigurationTools,
        NSteps,
        NStep,
        NTooltip,
        NInput,
        NModal,
        NCard,
        NLayoutFooter,
        NLayoutSider,
        NLayoutContent,
        NLayoutHeader,
        NLayout,
        BrainstormBoardCard,
        NButton,
        NH1,
        IconSettings,
        NH2,
        NGradientText,
        NFlex,
        NPageHeader,
        NSpace,
        NavConfigurationModal,
    },
    data(): BrainstormBoardViewData {
        return {
            hoveredCard: null,
            isHoveringCard: false,
            isEdit: false,
            showOptions: false,
            editingCard: null,
            currentConnectingStep: 1,
            newCardTitle: '',
            newCardValue: '',
            showAddingModal: false,
            isDragging: false,
            startX: 0,
            startY: 0,
            cursorX: 0,
            cursorY: 0,
            x: 0,
            y: 0,
        };
    },
    setup() {
        const notification = useNotification();
        return {
            interConnectionError() {
                notification.error({
                    content: "Let's not make pointing each to other or self. It's definitely some logic mistake.",
                    duration: 3000,
                });
            },
            cardAdded() {
                notification.success({
                    content: 'Card added.',
                    duration: 2000,
                });
            },
            cardRemoved() {
                notification.success({
                    content: 'Card removed.',
                    duration: 2000,
                });
            },
            cardsRemoved() {
                notification.success({
                    content: 'Board cleared.',
                    duration: 2000,
                });
            },
            cardModified() {
                notification.success({
                    content: 'Card updated.',
                    duration: 2000,
                });
            },
            cardsConnected() {
                notification.success({
                    content: 'Card connected.',
                    duration: 2000,
                });
            },
        };
    },
    computed: {
        ...mapStores(useAuth, useBrainstormBoard, useGlobalSettings),
        ...mapState(useGlobalSettings, ['isDarkMode']),
        ...mapState(useAuth, ['isTeacher', 'isAuthorized']),
        ...mapState(useBrainstormBoard, ['cards', 'scale', 'selectedCard', 'isConnectingMode']),

        boardStyle() {
            return {
                transform: `scale(${this.scale})`,
                left: `${this.x}px`,
                top: `${this.y}px`,
            };
        },
        layoutStyle() {
            return {
                transformOrigin: `${this.cursorX}px ${this.cursorY}px`,
            };
        },
    },
    methods: {
        ...mapActions(useAuth, ['signOut']),
        ...mapActions(useBrainstormBoard, [
            'setScale',
            'add',
            'clearAll',
            'clearHover',
            'setSelected',
            'clearSelected',
            'setMousePosition',
            'remove',
            'setIsConnectingMode',
        ]),

        signOutUser() {
            this.signOut();
            router.push({ name: 'signIn' });
        },
        removeCard() {
            if (this.editingCard) {
                this.remove(this.editingCard);
            }
            this.clearCardData();
            this.cardRemoved();
        },
        updateCard() {
            if (this.editingCard) {
                this.editingCard.title = this.newCardTitle;
                this.editingCard.content = this.newCardValue;
            }
            this.clearCardData();
            this.cardModified();
        },
        editCardData(card: any) {
            this.showAddingModal = true;
            this.isEdit = true;
            this.editingCard = card;
            this.newCardTitle = card.title;
            this.newCardValue = card.content;
        },
        clearCardData() {
            this.showAddingModal = false;
            this.newCardTitle = '';
            this.newCardValue = '';
            this.isEdit = false;
            this.editingCard = null;
        },
        hoverCard(isHovering: boolean, card: BrainstormCard | null = null) {
            if (card) {
                card.isHovering = isHovering;
                this.hoveredCard = card;
                return;
            }

            if (this.hoveredCard) {
                this.hoveredCard.isHovering = false;
            }
        },
        nextStep(step: number) {
            this.currentConnectingStep = step;
        },
        resetStep() {
            this.currentConnectingStep = 1;
        },
        cardClick(card: BrainstormCard) {
            if (!this.isConnectingMode) {
                return;
            }

            if (!this.selectedCard) {
                this.setSelected(card);
                card.isSelected = true;
                this.nextStep(2);
                return;
            }

            if (
                card.connections.filter((connection) => this.selectedCard?.id === connection.id).length ||
                this.selectedCard.connections.filter((connection) => card.id === connection.id).length ||
                this.selectedCard.id === card.id
            ) {
                card.isSelected = false;
                this.selectedCard.isSelected = false;
                this.setSelected(null);
                this.setIsConnectingMode(false);
                this.resetStep();
                this.interConnectionError();
                return;
            }

            this.selectedCard.connections.push(card);
            card.isSelected = false;
            this.selectedCard.isSelected = false;
            this.setSelected(null);
            this.nextStep(3);
            this.cardsConnected();

            setTimeout(() => {
                this.setIsConnectingMode(false);
                this.resetStep();
            }, 350);
        },
        startConnecting() {
            this.setIsConnectingMode(!this.isConnectingMode);
            if (!this.isConnectingMode) {
                this.resetStep();
                if (!this.selectedCard) {
                    return;
                }
                this.clearSelected(this.selectedCard);
            }
        },
        removeAll() {
            this.clearAll();
            this.cardsRemoved();
        },
        addCard() {
            const width = 200;
            const height = 250;
            const headerHeight = 72;
            const top = 0;
            const left = 0;

            this.add({
                id: guid(),
                title: this.newCardTitle,
                content: this.newCardValue,
                connections: [],
                isDragging: false,
                isHovering: false,
                isSelected: false,
                width: width,
                height: height,
                offsetX: 0,
                offsetY: 0,
                headerHeight: headerHeight,
                rotation: 0,
                position: { left: left, top: top },
            });

            this.clearCardData();
            this.cardAdded();
        },
        wheel(event: any) {
            event.preventDefault();
            if (event.deltaY < 0) {
                this.setScale(this.scale + 0.1);
            } else {
                this.setScale(this.scale - 0.1);
            }

            this.setScale(Math.min(Math.max(0.2, this.scale), 2));

            if (this.scale >= 2 || this.scale <= 0.2) {
                return;
            }

            const content = this.$refs.content as HTMLElement;
            this.cursorX = event.pageX - content.offsetLeft;
            this.cursorY = event.pageY - content.offsetTop;
        },
        preserveMousePosition(event: MouseEvent) {
            if (this.isConnectingMode && this.selectedCard) {
                const content = this.$refs.content as HTMLElement;
                this.setMousePosition(
                    (event.pageX - content.offsetLeft) / this.scale,
                    (event.pageY - content.offsetTop) / this.scale,
                );
            }
        },
        onMouseDown(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (target.classList.contains('n-card__content') || target.classList.contains('line')) {
                return;
            }

            const element = this.$refs.content as HTMLElement;
            this.isDragging = true;
            this.startX = event.pageX - element.offsetLeft;
            this.startY = event.pageY - element.offsetTop;

            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
        },
        onMouseMove(event: MouseEvent) {
            if (!this.isDragging) {
                return;
            }

            event.preventDefault();
            this.x = event.pageX - this.startX;
            this.y = event.pageY - this.startY;
        },
        onMouseUp() {
            this.isDragging = false;
            document.removeEventListener('mousemove', this.onMouseMove);
        },
    },
});
</script>

<style scoped>
.inner-board {
    height: 100%;
    position: absolute;
}
.steps {
    position: absolute;
    bottom: 25px;
    right: 35px;
}
</style>
