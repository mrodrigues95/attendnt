import { ComponentProps } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	FieldValues,
	FormProvider,
	SubmitHandler,
	useFormContext,
	UseFormReturn,
	useForm as useHookForm,
	UseFormProps as UseHookFormProps,
} from 'react-hook-form';
import { TypeOf, ZodSchema } from 'zod';

import { FormInput } from './form-input';

interface UseFormErrorProps {
	name?: string;
}

export const useFormError = ({ name }: UseFormErrorProps) => {
	const {
		formState: { errors },
	} = useFormContext();

	if (!name) {
		return null;
	}

	return errors[name];
};

interface UseFormProps<T extends ZodSchema<any>>
	extends UseHookFormProps<TypeOf<T>> {
	schema: T;
}

export const useForm = <T extends ZodSchema<any>>({
	schema,
	...formConfig
}: UseFormProps<T>) =>
	useHookForm({
		...formConfig,
		resolver: zodResolver(schema),
	});

interface FormProps<T extends FieldValues = any>
	extends Omit<ComponentProps<'form'>, 'onSubmit'> {
	form: UseFormReturn<T>;
	onSubmit: SubmitHandler<T>;
}

export const Form = <T extends FieldValues>({
	form,
	onSubmit,
	children,
	...props
}: FormProps<T>) => (
	<FormProvider {...form}>
		<form onSubmit={form.handleSubmit(onSubmit)} {...props}>
			{children}
		</form>
	</FormProvider>
);

Form.Input = FormInput;
