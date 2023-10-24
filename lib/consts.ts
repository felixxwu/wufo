import { colors } from './colors'

export const consts = {
    borderRadius: 8,
    borderRadiusSmall: 5,
    shadow: '0 0 10px 0 rgba(0,0,0,0.5)',
    shortTransition: 200,
    releaseAnimationStaggerDelay: 200, // time between each release animation start
    headerIconSize: 30,
    coverArtSize: 235,
    performanceCutoff: 800, // if it takes 800ms to start the first animation, the device is too slow
    mobileViewWidth: 600,
    startOfSongThreshold: 0.05,
    getReleaseColor: (hue: number | null) => (hue === null ? '#333' : `hsl(${hue}, 25%, 30%)`),
    getLighterReleaseColor: (hue: number | null) =>
        hue === null ? '#333' : `hsl(${hue}, 60%, 90%)`,
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
        introAnimationDelay: 500, // delay intro animation so the first cell has time to animate
        introZoomTime: 1000,
        introZoomAmount: 2,
        introFadeTime: 500, // time for intro to go from 0 to 1 opacity at the start
        seed: 3,
        overflow: 8,
        shiftLeft: 0,
        textColor: colors.textDark,
        introTextColor: colors.textSecondary,
        onLoadCutoff: 0.05, // 0.4 = load UI after 40% of animations started
    },
} as const
