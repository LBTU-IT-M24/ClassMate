import type { IStyleConfiguration } from '@/models/StyleConfiguration/IStyleConfiguration';

export const getDefaultConfiguration = (): IStyleConfiguration => {
    return { transparency: 100, fontSize: 12, color: 'FFFFFF' };
};
