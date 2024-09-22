import type { ITimeModel } from '@/models/Date/ITimeModel';

export const secondsToTime = (seconds: number): ITimeModel => {
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    return { hours, minutes, seconds };
};

export const timeToSeconds = (time: ITimeModel): number => {
    const { hours, minutes, seconds } = time;

    return hours * 3600 + minutes * 60 + seconds;
};
