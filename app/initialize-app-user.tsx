'use client';

import { useAppUserId } from '~/src/lib/hooks';

export const InitializeAppUser = () => {
	// This will save an id in local storage as a side effect.
	useAppUserId();
	return null;
};
