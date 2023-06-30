'use client';

import { z } from 'zod';

import { Form, useForm } from '~/src/components';

const schema = z.object({
	activityName: z
		.string()
		.min(1, 'Name must be atleast 1 characters long!')
		.max(5, 'Name has exceeded the maximum character length!'),
});

const CreateActivity = () => {
	const form = useForm({ schema });

	return (
		<Form
			form={form}
			onSubmit={() => {
				console.log('Submitting...');
			}}
		>
			<Form.Input
				label="Activity Name"
				isRequired
				{...form.register('activityName')}
			/>
			<button type="submit">Submit</button>
		</Form>
	);
};

export default CreateActivity;
