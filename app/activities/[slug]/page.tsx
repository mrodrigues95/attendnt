import { kv } from '@vercel/kv';

import { ACTIVITY_KEYS } from '~/src/lib/redis';

interface Props {
	params: { id: string };
}

const Activity = async ({ params }: Props) => {
	// const activity = await kv.hgetall(ACTIVITY_KEYS.base(params.id));

	// console.log('activity', activity);

	return <h1>test</h1>;
};

export default Activity;
