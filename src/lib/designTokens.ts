/**
 * Shared visual rules for the public catalogue.
 *
 * These exist because the same values had drifted across components — product
 * cards were rounded-2xl while category cards were rounded-xl, and stray
 * green/purple/red accents had appeared alongside the blue brand colour. Import
 * these instead of hardcoding, so a change lands everywhere at once.
 */

/**
 * Corner radius system. One scale, applied by element role:
 *   card   -> containers, tiles, panels
 *   button -> buttons, inputs, skeleton blocks standing in for them
 *   pill   -> badges, avatars, icon circles
 */
export const RADIUS = {
  card: 'rounded-xl',
  button: 'rounded-lg',
  pill: 'rounded-full',
} as const;

/**
 * Single accent. Blue is the established brand colour, so everything
 * interactive or emphasised uses this family and nothing else.
 */
export const ACCENT = {
  solid: 'bg-blue-600',
  solidHover: 'hover:bg-blue-700',
  text: 'text-blue-600',
  textHover: 'hover:text-blue-700',
  subtle: 'bg-blue-50',
  border: 'border-blue-600',
  ring: 'focus-visible:ring-blue-500',
} as const;

/** Vertical rhythm for full-width sections. */
export const SECTION = {
  padding: 'py-16 md:py-20',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
} as const;
