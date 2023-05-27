import { colors } from './colors'

export const consts = {
    borderRadius: 8,
    borderRadiusSmall: 5,
    shadow: '0 0 10px 0 rgba(0,0,0,0.5)',
    shortTransition: 200,
    releaseAnimationStaggerDelay: 200,
    headerIconSize: 30,
    coverArtSize: 235,
    performanceCutoff: 600, // if it takes 600ms to start the first animation, the device is too slow
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
        textColor: colors.textDark,
        introTextColor: colors.textSecondary,
        onLoadCutoff: 0.7, // 0.5 = 50% of animations started
    },
} as const
