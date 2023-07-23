'use client';

import { z } from 'zod';

import { Form, useForm } from '~/src/components';
import { useAppUserId, useToast } from '~/src/lib/hooks';
import { createActivity } from './actions';

const schema = z.object({
	activity: z
		.string()
		.min(1, 'Activity must be atleast 1 characters long.')
		.max(256, 'Activity has exceeded the maximum character length.'),
});

const CreateActivityForm = () => {
	const { userId } = useAppUserId();
	const { toast } = useToast();
	const form = useForm({
		schema,
		defaultValues: { activity: '' },
	});

	return (
		<Form
			form={form}
			aria-label="Create an activity"
			onSubmit={data =>
				createActivity(userId!, data.activity).catch(err => {
					form.setServerError({ message: err });
					toast({
						title: 'Uh-oh! Something went wrong.',
						description: 'There was a problem with your request.',
					});
				})
			}
		>
			<Form.Input name="activity" label="Activity" isRequired />
			<Form.ImperativeSubmit>Submit</Form.ImperativeSubmit>
		</Form>
	);
};

export default CreateActivityForm;
