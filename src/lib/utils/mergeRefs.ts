import { ForwardedRef } from 'react';

export const mergeRefs = <T>(...refs: ForwardedRef<T>[]): ForwardedRef<T> => {
	if (refs.length === 1) {
		return refs[0];
	}

	return value => {
		for (const ref of refs) {
			if (typeof ref === 'function') {
				ref(value);
			} else if (ref !== null) {
				ref.current = value;
			}
		}
	};
};
