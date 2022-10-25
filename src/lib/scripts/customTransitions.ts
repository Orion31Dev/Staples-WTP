import { cubicOut } from 'svelte/easing';

export function expand(
	node: Element,
	params: { delay?: number; duration?: number; easing?: ((t: number) => number) | undefined }
) {
	const { delay = 0, duration = 400, easing = cubicOut } = params;

	const w = parseFloat(getComputedStyle(node).strokeWidth);

	return {
		delay,
		duration,
		easing,
		css: (t: number) => {
			return `opacity: ${t}; stroke-width: ${(1 - t) * w}`;
		}
	};
}
