'use server';

import { kv } from '@vercel/kv';
import { customAlphabet } from 'nanoid';

const USER_KEYS = {
	base: (userId: string) => `users:${userId}` as const,
};

const ACTIVITY_KEYS = {
	base: (activityId: string) => `activities:${activityId}` as const,
	participants: (activityId: string) =>
		`${ACTIVITY_KEYS.base(activityId)}:participants` as const,
};

const ALPHABET =
	'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const generateActivityId = () => {
	// Generate a shorter "user friendly" id so that we can use it in the
	// URL later on. The id will also be part of the cache key to avoid collisions.
	const id = customAlphabet(ALPHABET, 10)();
	const key = ACTIVITY_KEYS.base(id);
	return { id, key };
};

export const createActivity = async (
	creatorId: string,
	activityName: string,
) => {
	let { id, key } = generateActivityId();

	while ((await kv.hexists(key, 'id')) === 1) {
		({ id, key } = generateActivityId());
	}

	const activity = {
		id,
		creatorId,
		name: activityName,
	};

	await Promise.all([
		kv.hset(key, activity),
		kv.hsetnx(USER_KEYS.base(creatorId), 'id', creatorId),
	]);

	return activity;
};
