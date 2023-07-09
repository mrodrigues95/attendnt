import { forwardRef } from 'react';
import {
	Input as AriaInput,
	InputProps as AriaInputProps,
	Label as AriaLabel,
	LabelProps as AriaLabelProps,
	Text as AriaText,
	TextField as AriaTextField,
	TextFieldProps as AriaTextFieldProps,
	TextProps as AriaTextProps,
} from 'react-aria-components';

import { cn } from '~/src/lib/utils';

interface InputMessageProps extends AriaTextProps {}

const InputMessage = ({ className, ...props }: InputMessageProps) => (
	<AriaText className={cn('text-sm leading-none', className)} {...props} />
);

export interface InputProps extends AriaTextFieldProps {
	label?: string;
	description?: string;
	errorMessage?: string;
	placeholder?: string;
	labelProps?: AriaLabelProps;
	inputProps?: AriaInputProps;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			type = 'text',
			label,
			description,
			errorMessage,
			placeholder,
			name,
			isRequired,
			labelProps,
			inputProps,
			className,
			...props
		},
		ref,
	) => (
		<AriaTextField
			type={type}
			validationState={errorMessage ? 'invalid' : 'valid'}
			isRequired={isRequired}
			className={cn(
				'flex flex-col w-full max-w-sm gap-2',
				errorMessage && 'text-red-500',
				className,
			)}
			{...props}
			ref={ref}
		>
			<AriaLabel
				{...labelProps}
				className={cn(
					'block text-sm font-medium leading-none',
					labelProps?.className,
				)}
			>
				{label} {isRequired && <i aria-hidden="true">*</i>}
			</AriaLabel>
			<AriaInput
				{...inputProps}
				placeholder={placeholder}
				className={cn(
					'block w-full rounded-md border border-slate-300 shadow-sm px-3 py-2 text-sm outline-none bg-white ring-offset-4',
					'focus:border-blue-400 focus:ring-4 focus:ring-blue-200',
					'placeholder:text-slate-400',
					'disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none',
					'focus:aria-invalid:border-red-200 focus:aria-invalid:ring-red-200',
					'focus:invalid:border-red-500 focus:invalid:ring-red-200',
					'aria-invalid:border-red-500 aria-invalid:text-red-600',
					'invalid:border-red-500 invalid:text-red-600',
					inputProps?.className,
				)}
			/>
			{description && (
				<InputMessage slot="description">{description}</InputMessage>
			)}
			{errorMessage && (
				<InputMessage slot="errorMessage">{errorMessage}</InputMessage>
			)}
		</AriaTextField>
	),
);

Input.displayName = 'Input';
