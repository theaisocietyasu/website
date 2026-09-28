/**
 * The AIS chip mark (chip body, circuit traces, rings, "AI SOCIETY"), traced from the official logo.
 * Units are the source artwork's pixels. Shared by the navbar SVG and the ASCII hero.
 */
export const LOGO = { cx: 418, cy: 443, w: 745, h: 715 }
export const CHIP = { x0: 195, y0: 245, x1: 640, y1: 638 }
export const BODY = "M215 245 H620 Q640 245 640 265 V618 Q640 638 620 638 H215 Q195 638 195 618 V265 Q195 245 215 245 Z"
export const TRACES = [
  "M300 250 L300 232 L270 198", // top
  "M370 250 V143",
  "M425 250 V205",
  "M490 250 V185 L525 148",
  "M200 372 H128 L97 341", // left
  "M200 425 H154",
  "M200 478 H112",
  "M200 530 H155 L131 554",
  "M635 350 H690 L707 331", // right
  "M635 405 H726",
  "M635 460 H683",
  "M635 515 H700 L741 551",
  "M330 633 V700 L301 745", // bottom
  "M405 633 V755",
  "M470 633 V716",
  "M545 633 V698 L556 708",
]
export const RINGS: [number, number, number][] = [
  [262, 190, 20], [365, 118, 26], [425, 183, 20], [545, 122, 30],
  [75, 318, 28], [90, 478, 19], [115, 572, 23],
  [720, 315, 24], [748, 405, 19], [760, 568, 24],
  [280, 770, 28], [470, 738, 19], [568, 728, 21],
]
export const DOTS: [number, number, number][] = [[140, 425, 14], [695, 460, 14], [405, 770, 15]]
export const FRAME = { x: 248, y: 293, w: 342, h: 300, r: 14 }
export const LETTER_A = "M338 470 L378 345 L416 470"
export const A_BAR = "M352 432 H394"
export const LETTER_I = "M488 342 V470"
export const SOCIETY = { y: 533, x0: 310, x1: 525 }
