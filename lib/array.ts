export function array<ItemType>(length: number, callback: (index: number) => ItemType): ItemType[] {
    return [...Array(Math.round(length))].map((_, i) => callback(i))
}
export function range<ItemType>(
    from: number,
    to: number,
    callback: (index: number) => ItemType
): ItemType[] {
    return [...Array(Math.round(to - from))].map((_, i) => callback(i + from))
}
