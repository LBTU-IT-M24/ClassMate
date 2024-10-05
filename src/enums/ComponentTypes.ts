export enum ComponentTypes {
    ANALOG_CLOCK = 'ANALOG_CLOCK',
    TIMER = 'TIMER_STOPWATCH',
    LESSONS = 'LESSONS',
    NOTES = 'NOTES',
    PLAYLIST = 'PLAYLIST',
    BOOKMARKS = 'BOOKMARKS',
}

export function getComponentName(type: ComponentTypes): string {
    return {
        [ComponentTypes.ANALOG_CLOCK]: 'Clock',
        [ComponentTypes.TIMER]: 'Timer',
        [ComponentTypes.LESSONS]: 'Lessons',
        [ComponentTypes.NOTES]: 'Notes',
        [ComponentTypes.PLAYLIST]: 'Playlist',
        [ComponentTypes.BOOKMARKS]: 'Bookmarks',
    }[type];
}
