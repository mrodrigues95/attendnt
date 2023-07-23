'use client';

import {
	ComponentProps,
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	FieldValues,
	FormProvider,
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
	UseFormSetError,
	useForm as useHookForm,
	UseFormProps as UseHookFormProps,
} from 'react-hook-form';
import { TypeOf, ZodSchema } from 'zod';

import { Tail } from '~/src/lib/types';
import { cn } from '~/src/lib/utils';
import { FormImperativeSubmitButton } from './form-imperative-submit-button';
import { FormInput } from './form-input';
import { FormSubmitButton } from './form-submit-button';

interface ImperativeForm {
	isSubmissionBlocked: boolean;
	onBlockSubmission: Dispatch<SetStateAction<boolean>>;
}

const ImperativeFormContext = createContext<ImperativeForm | null>(null);

export const useImperativeForm = () =>
	useContext(ImperativeFormContext) as ImperativeForm;

const ImperativeFormProvider = ({
	children,
}: {
	children: (ctx: ImperativeForm) => ReactNode;
}) => {
	const [isSubmissionBlocked, setIsSubmissionBlocked] = useState(false);

	const onBlockSubmission = useCallback(setIsSubmissionBlocked, [
		setIsSubmissionBlocked,
	]);

	const ctx = useMemo(
		() => ({ isSubmissionBlocked, onBlockSubmission }),
		[isSubmissionBlocked, onBlockSubmission],
	);

	return (
		<ImperativeFormContext.Provider value={ctx}>
			{children(ctx)}
		</ImperativeFormContext.Provider>
	);
};

interface UseFormProps<TSchema extends ZodSchema<any>>
	extends UseHookFormProps<TypeOf<TSchema>> {
	schema: TSchema;
}

export const useForm = <TSchema extends ZodSchema<any>>({
	schema,
	...formConfig
}: UseFormProps<TSchema>) => {
	const form = useHookForm({
		...formConfig,
		resolver: zodResolver(schema),
	});

	return {
		...form,
		setServerError: useCallback(
			(...args: Tail<Parameters<UseFormSetError<TSchema>>>) =>
				form.setError('root.server', ...args),
			[form],
		),
	};
};

interface FormProps<TFieldValues extends FieldValues = any>
	extends Omit<ComponentProps<'form'>, 'onSubmit' | 'onError'> {
	'aria-label': string;
	form: UseFormReturn<TFieldValues>;
	onSubmit: SubmitHandler<TFieldValues>;
	onError?: SubmitErrorHandler<TFieldValues>;
}

export const Form = <TFieldValues extends FieldValues>({
	form,
	onSubmit,
	onError,
	children,
	...props
}: FormProps<TFieldValues>) => (
	<ImperativeFormProvider>
		{({ isSubmissionBlocked }) => (
			<FormProvider {...form}>
				<form
					onSubmit={form.handleSubmit(
						isSubmissionBlocked ? () => {} : onSubmit,
						onError,
					)}
					{...props}
					className={cn('space-y-4', props?.className)}
				>
					{children}
				</form>
			</FormProvider>
		)}
	</ImperativeFormProvider>
);

Form.Input = FormInput;
Form.Submit = FormSubmitButton;
Form.ImperativeSubmit = FormImperativeSubmitButton;
