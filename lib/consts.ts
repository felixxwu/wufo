import { colours } from './colours'

export const consts = {
    borderRadius: 10,
    shadow: '0 0 5px 0 rgba(0,0,0,0.5)',
    background: {
        cellWidth: 120,
        cellHeight: 36,
        fontSize: 35,
        noiseFrequency: 0.0015,
        noiseAmp: 500,
        noiseOctave: 1,
        animationInterval: 10,
        angle: 10,
        stagger: 3,
        introAnimationSpeed: 0.5,
        introAnimationDelay: 1500,
        introZoomTime: 2000,
        introZoomAmount: 2,
        introFadeTime: 800,
        seed: 3,
        overflow: 8,
        shiftLeft: 60,
        textColour: colours.textDark,
        introTextColour: colours.textSecondary,
        onLoadCutoff: 0.5, // 0.5 = 50% of animations started
    },
} as const
