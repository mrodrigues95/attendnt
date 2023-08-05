'use client';

import { useEffect } from 'react';

interface Props {
	error: Error;
	reset: () => void;
}

const Error = ({ error, reset }: Props) => {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div>
			<h2>Something went wrong!</h2>
			<button onClick={() => reset()}>Try again</button>
		</div>
	);
};

export default Error;
