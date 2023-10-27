export function pointerHelper(enter: () => void, leave: () => void) {
  return {
    onpointerenter: enter,
    onpointermove: enter,
    onpointerover: enter,
    onpointerleave: leave,
    onpointerout: leave,
    onpointercancel: leave,
  }
}
