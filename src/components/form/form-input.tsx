'use client';

import { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { mergeRefs } from '~/src/lib/utils';
import { Input, InputProps } from '../input/input';

interface FormInputProps extends InputProps {
	name: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	(props, ref) => {
		const form = useFormContext();

		return (
			<Controller
				name={props.name}
				control={form.control}
				render={({ field, fieldState }) => (
					<Input
						errorMessage={fieldState.error?.message}
						{...field}
						{...props}
						ref={mergeRefs(ref, field.ref)}
					/>
				)}
			/>
		);
	},
);

FormInput.displayName = 'FormInput';
