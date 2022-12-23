import { Pos } from './types'

export function isPointInside(
    point: Pos,
    area: { w: number; h: number },
    cell: { w: number; h: number }
) {
    return (
        point.x > -2 * cell.w &&
        point.x < area.w + 2 * cell.w &&
        point.y > cell.h &&
        point.y < area.h + 5 * cell.h
    )
}
