'use client';

import { Button, ButtonProps } from '../button/button';

interface FormSubmitButtonProps extends ButtonProps {}

export const FormSubmitButton = (props: FormSubmitButtonProps) => (
	<Button type="submit" {...props} />
);
