'use client';

import { z } from 'zod';

import { Form, useForm } from '~/src/components';
import { useAppUserId } from '~/src/lib/hooks';
import { createActivity } from './actions';

const schema = z.object({
	activity: z
		.string()
		.min(1, 'Activity must be atleast 1 characters long.')
		.max(256, 'Activity has exceeded the maximum character length.'),
});

const CreateActivityForm = () => {
	const { userId } = useAppUserId();
	const form = useForm({ schema, defaultValues: { activity: '' } });

	return (
		<Form
			form={form}
			aria-label="Create an activity"
			onSubmit={data =>
				createActivity(userId!, data.activity).catch(err =>
					form.setServerError({ message: err }),
				)
			}
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

export default CreateActivityForm;
