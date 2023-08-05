export const USER_KEYS = {
	base: (userId: string) => `users:${userId}` as const,
};

export const ACTIVITY_KEYS = {
	base: (activityId: string) => `activities:${activityId}` as const,
	participants: (activityId: string) =>
		`${ACTIVITY_KEYS.base(activityId)}:participants` as const,
};
