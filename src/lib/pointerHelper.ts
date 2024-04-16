export function pointerHelper(enter: () => void, leave: () => void) {
  return {
    onPointerEnter: enter,
    onPointerMove: enter,
    onPointerOver: enter,
    onPointerLeave: leave,
    onPointerOut: leave,
    onPointerCancel: leave,
  }
}
