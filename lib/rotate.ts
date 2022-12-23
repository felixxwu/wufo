import { Pos } from './types'

export function rotate(pos: Pos, degrees: number, around: Pos): Pos {
    return {
        x:
            Math.cos(degrees * (Math.PI / 180)) * (pos.x - around.x) -
            Math.sin(degrees * (Math.PI / 180)) * (pos.y - around.y) +
            around.x,
        y:
            Math.sin(degrees * (Math.PI / 180)) * (pos.x - around.x) +
            Math.cos(degrees * (Math.PI / 180)) * (pos.y - around.y) +
            around.y,
    }
}
