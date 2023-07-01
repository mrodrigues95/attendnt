import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button, ButtonProps } from '../button/button';

interface FormSubmitButtonProps extends ButtonProps {
	submittingText?: ReactNode;
}

export const FormSubmitButton = ({
	submittingText = 'Submitting...',
	children,
	...props
}: FormSubmitButtonProps) => {
	const { formState } = useFormContext();

	return (
		<Button type="submit" isBusy={formState.isSubmitting} isDisabled {...props}>
			{formState.isSubmitting ? submittingText : children}
		</Button>
	);
};
