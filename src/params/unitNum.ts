/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string) {
	const unit = parseInt(param);
	return !isNaN(unit) && unit >= 1 && unit <= 6;
}
