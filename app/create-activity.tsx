'use client';

import { z } from 'zod';

import { Form, useForm } from '~/src/components';

const schema = z.object({
	activity: z
		.string()
		.min(1, 'Activity must be atleast 1 characters long.')
		.max(256, 'Activity has exceeded the maximum character length.'),
});

const CreateActivity = () => {
	const form = useForm({ schema, defaultValues: { activity: '' } });

	return (
		<Form
			form={form}
			aria-label="Create an activity"
			onSubmit={async data => {
				console.log('Submitting...');
				await new Promise<number>((res, rej) => setTimeout(() => res(2), 2000));
			}}
		>
			<Form.Input
				name="activity"
				label="Activity"
				className="mb-9"
				isRequired
			/>
			<Form.ImperativeSubmit>Submit</Form.ImperativeSubmit>
		</Form>
	);
};

export default CreateActivity;
