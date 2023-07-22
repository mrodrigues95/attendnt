'use client';

import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useLocalStorage } from 'usehooks-ts';

export const LOCAL_STORAGE_KEY_ATTENDNT_USER_ID = 'attendnt-user-id';

export const useAppUserId = () => {
	const [userId, setUserId] = useLocalStorage<string | null>(
		LOCAL_STORAGE_KEY_ATTENDNT_USER_ID,
		null,
	);

	useEffect(() => {
		if (!userId) {
			setUserId(nanoid());
		}
	}, [setUserId, userId]);

	return { userId };
};
