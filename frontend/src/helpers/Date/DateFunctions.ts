import { format } from 'date-fns';

export const dateToUnixTimestamp = (date: Date | null): number => {
    if (!date) {
        return -1;
    }

    return millisecondsToSeconds(date.getTime());
};

export const formatDate = (date: Date, dateFormat: string = 'HH:mm:ss'): string => {
    if (!date) {
        return '';
    }
    return format(date, dateFormat);
};

export const millisecondsToSeconds = (milliseconds: number): number => {
    return Math.floor(milliseconds / 1000);
};
