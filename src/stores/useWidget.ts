import { defineStore } from 'pinia';
import { markRaw, type Component } from 'vue';
import { ComponentTypes } from '@/enums/ComponentTypes';
import Bookmarks from '@/components/Bookmark/Bookmarks.vue';
import Lessons from '@/components/Lesson/Lessons.vue';
import PersonalEditor from '@/components/Editor/PersonalEditor.vue';
import Playlist from '@/components/Playlist/Playlist.vue';
import SwitchableTimer from '@/components/Timer/SwitchableTimer.vue';
import IconClock from '@/components/icons/IconClock.vue';
import IconNotes from '@/components/icons/IconNotes.vue';
import IconBookmarks from '@/components/icons/IconBookmarks.vue';
import IconLessons from '@/components/icons/IconLessons.vue';
import IconPlaylist from '@/components/icons/IconPlaylist.vue';
import IconTimer from '@/components/icons/IconTimer.vue';
import ClockDraggable from '@/components/Clock/ClockDraggable.vue';
import type { IDraggablePosition } from '@/components/Draggable/interfaces/IDraggablePosition';

export interface IUseWidgetState {
    widgets: IWidget[];
}

interface IWidget {
    renderer: Component;
    customData: object;
    isVisible: boolean;
    type: ComponentTypes;
    icon: Component;
    position: IDraggablePosition;
}

export const useWidget: any = defineStore('widget', {
    state: (): IUseWidgetState => ({
        widgets: [
            {
                renderer: markRaw(Bookmarks),
                customData: {
                    style: '',
                },
                type: ComponentTypes.BOOKMARKS,
                isVisible: false,
                icon: markRaw(IconBookmarks),
                position: {
                    init: false,
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    isDragging: false,
                    dragStartX: null,
                    dragStartY: null,
                },
            },
            {
                renderer: markRaw(ClockDraggable),
                customData: {
                    style: '',
                },
                type: ComponentTypes.ANALOG_CLOCK,
                isVisible: false,
                icon: markRaw(IconClock),
                position: {
                    init: false,
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    isDragging: false,
                    dragStartX: null,
                    dragStartY: null,
                },
            },
            {
                renderer: markRaw(Lessons),
                customData: {
                    style: '',
                },
                type: ComponentTypes.LESSONS,
                isVisible: false,
                icon: markRaw(IconLessons),
                position: {
                    init: false,
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    isDragging: false,
                    dragStartX: null,
                    dragStartY: null,
                },
            },
            {
                renderer: markRaw(PersonalEditor),
                customData: {
                    style: '',
                },
                type: ComponentTypes.NOTES,
                isVisible: false,
                icon: markRaw(IconNotes),
                position: {
                    init: false,
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    isDragging: false,
                    dragStartX: null,
                    dragStartY: null,
                },
            },
            {
                renderer: markRaw(Playlist),
                customData: {
                    style: '',
                },
                type: ComponentTypes.PLAYLIST,
                isVisible: false,
                icon: markRaw(IconPlaylist),
                position: {
                    init: false,
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    isDragging: false,
                    dragStartX: null,
                    dragStartY: null,
                },
            },
            {
                renderer: markRaw(SwitchableTimer),
                customData: {
                    style: '',
                },
                type: ComponentTypes.TIMER,
                isVisible: false,
                icon: markRaw(IconTimer),
                position: {
                    init: false,
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    isDragging: false,
                    dragStartX: null,
                    dragStartY: null,
                },
            },
        ],
    }),
    getters: {
        activeWidgets(state) {
            return state.widgets.filter((widget) => widget.isVisible);
        },
        widgetVisibility(state) {
            return new Map<string, boolean>(state.widgets.map((widget) => [widget.type, widget.isVisible]));
        },
        widgetByType(state) {
            return (type: string) => state.widgets.find((widget) => widget.type === type);
        },
    },
    actions: {
        updateVisibility(type: string, visibility: boolean) {
            const widget = this.widgets.find((widget) => widget.type === type);

            if (!widget) {
                return;
            }

            widget.isVisible = visibility;
        },
        getPosition(type: string) {
            return this.widgets.find((widget) => widget.type === type)?.position;
        },
        getIcon(type: string) {
            return this.widgets.find((widget) => widget.type === type)?.icon;
        },
        updatePosition(type: string, position: IDraggablePosition) {
            const widget = this.widgets.find((widget) => widget.type === type);

            if (!widget) {
                return;
            }

            widget.position = position;
        },
    },
});
