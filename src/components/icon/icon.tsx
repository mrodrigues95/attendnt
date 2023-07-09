import { cva, VariantProps } from 'class-variance-authority';
// @ts-ignore: https://github.com/lucide-icons/lucide/issues/1373
import { icons, LucideProps } from 'lucide-react';

import { cn } from '~/src/lib/utils';

const spinnerVariants = cva('', {
	variants: {
		size: {
			sm: 'h-4 w-4',
			md: 'h-6 w-6',
			lg: 'h-8 w-8',
		},
	},
	defaultVariants: {
		size: 'sm',
	},
});

export interface IconProps
	extends Omit<LucideProps, 'size'>,
		VariantProps<typeof spinnerVariants> {
	name: string;
}

export const Icon = ({ name, size, className, ...props }: IconProps) => {
	const LucideIcon = icons[name];

	return (
		<LucideIcon
			aria-hidden="true"
			className={cn(spinnerVariants({ size, className }))}
			{...props}
		/>
	);
};
