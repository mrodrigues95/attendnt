'use client';

export type Tail<T extends unknown[]> = T extends [infer Head, ...infer Tail]
	? Tail
	: never;
