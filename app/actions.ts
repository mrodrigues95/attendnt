'use server';

import { kv } from '@vercel/kv';

export const createActivity = (activityName: string) =>
	kv.set('test1', activityName, { nx: true });
