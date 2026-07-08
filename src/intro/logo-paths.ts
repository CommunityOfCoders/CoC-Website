/**
 * The clean CoC mark, traced from the brand reference.
 *
 * Each crescent is a true circular-arc lune — outer arc on a circle of
 * R100 centered (185,160), inner arc on a circle of R112 centered
 * (239,167), tips meeting at (202,62) and (176,260). The second crescent
 * is the same path rotated 180° about (200,200), so the two tips wrap the
 * central "O" (ellipse ring 30×34 outer, 13×16 counter) in a yin-yang
 * swirl.
 *
 * glass.ts mirrors this geometry analytically (point-in-circle tests) to
 * fragment the mark into the 3D shard field — keep the two in sync.
 *
 * ViewBox is 0 0 400 400, mark centered on (200,200), spanning
 * roughly x 85..315, y 60..340.
 */

export const GREEN = '#8FD400';

/** Tight square viewBox around the bare mark (for the docked clean logo). */
export const MARK_VIEWBOX = '58 58 284 284';

/** Upper-left crescent, opening rightward. Rotate 180° about (200,200) for its twin. */
export const CRESCENT_D =
  'M 202 62 A 100 100 0 1 0 176 260 A 112 112 0 0 1 202 62 Z';

/** Bold rounded "O" ring (even-odd — the counter is transparent). */
export const O_D =
  'M 230 200 A 30 34 0 1 0 170 200 A 30 34 0 1 0 230 200 Z ' +
  'M 213 200 A 13 16 0 1 0 187 200 A 13 16 0 1 0 213 200 Z';
