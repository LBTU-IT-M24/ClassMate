import { create } from 'naive-ui';

const naive = create({});

export function useThemeOverrides() {
    return {
        common: {
            primaryColor: '#0EAD69',
            primaryColorHover: '#2EDD82',
            primaryColorPressed: '#0A9F58',
            primaryColorSuppl: '#0EAD69',
            fontFamily: "'Barlow', sans-serif",
        },
    };
}

export default naive;