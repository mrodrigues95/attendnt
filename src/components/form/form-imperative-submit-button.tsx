import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button, ButtonProps } from '../button/button';
import { Icon } from '../icon/icon';
import { Spinner } from '../spinner/spinner';
import { useImperativeForm } from './form';

interface AriaLabels {
	loading?: string;
	success?: string;
}

interface FormImperativeSubmitButtonProps extends ButtonProps {
	labels?: AriaLabels;
}

export const FormImperativeSubmitButton = ({
	labels,
	children,
	...props
}: FormImperativeSubmitButtonProps) => {
	const { formState } = useFormContext();
	const { onBlockSubmission } = useImperativeForm();

	const isSubmitting = formState.isSubmitting;

	const isSubmitSuccessful =
		formState.isSubmitted &&
		formState.isSubmitSuccessful &&
		!formState.errors.root?.server &&
		!isSubmitting;

	const isDisabled = isSubmitting || isSubmitSuccessful;

	const label = isSubmitting
		? labels?.loading ?? 'Loading'
		: isSubmitSuccessful
		? labels?.success ?? 'Success'
		: undefined;

	useEffect(() => {
		if (isDisabled) {
			onBlockSubmission(true);
		} else {
			onBlockSubmission(false);
		}
	}, [isDisabled, onBlockSubmission]);

	return (
		<div>
			<span role="status" aria-live="polite" className="sr-only">
				{isDisabled && label}
			</span>
			<Button
				type="submit"
				aria-disabled={isDisabled}
				aria-label={label}
				size={isDisabled ? 'icon' : 'sm'}
				{...props}
			>
				{isSubmitting && <Spinner size="sm" />}
				{isSubmitSuccessful && <Icon name="Check" size="sm" />}
				{!isDisabled && children}
			</Button>
		</div>
	);
};
