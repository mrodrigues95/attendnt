'use client';

import { Loader2 } from 'lucide-react';
import { z } from 'zod';

import { Button, Form, useForm } from '~/src/components';

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
			onSubmit={async () => {
				console.log('Submitting...');
				await new Promise(res => setTimeout(res, 500));
			}}
		>
			<Form.Input
				name="activity"
				label="Activity"
				className="mb-9"
				isRequired
			/>
			<Form.SubmitButton>Test</Form.SubmitButton>
		</Form>
	);
};

export default CreateActivity;
