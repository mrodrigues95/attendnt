import { forwardRef } from 'react';
import { ChangeHandler } from 'react-hook-form';

import { Input, InputProps } from '../input/input';
import { useFormError } from './form';

interface FormInputProps extends Omit<InputProps, 'onChange'> {
	label?: string;
	onChange?: ChangeHandler;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	({ onChange, ...props }, ref) => {
		const error = useFormError({ name: props.name });

		console.log(error);

		return (
			<Input
				onChange={value => onChange?.({ target: { value } })}
				errorMessage={String(error?.message)}
				{...props}
				ref={ref}
			/>
		);
	},
);

FormInput.displayName = 'FormInput';
