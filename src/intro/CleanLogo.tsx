import { CRESCENT_D, GREEN, MARK_VIEWBOX, O_D } from './logo-paths';

/**
 * Variant 2 — the polished resting mark: two interlocking crescent lunes
 * and the bold "O", solid lime green, perfectly smooth (no filters, no
 * texture). This is what the intro resolves into at SHRINK_TARGET.
 *
 * `tight` crops the viewBox to the bare mark so the docked logo fills its
 * box; the default keeps the splatter variant's coordinate space so the
 * Phase-3 cross-fade overlays pixel-aligned.
 */
export function CleanLogo({ tight = false }: { tight?: boolean }) {
  return (
    <svg
      viewBox={tight ? MARK_VIEWBOX : '0 0 400 400'}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill={GREEN}>
        <path d={CRESCENT_D} />
        <path d={CRESCENT_D} transform="rotate(180 200 200)" />
        <path d={O_D} fillRule="evenodd" />
      </g>
    </svg>
  );
}
