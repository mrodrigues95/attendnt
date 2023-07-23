'use client';

import dynamic from 'next/dynamic';
import { cva, VariantProps } from 'class-variance-authority';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

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
	name:  keyof typeof dynamicIconImports;
}

export const Icon = ({ name, size, className, ...props }: IconProps) => {
	const LucideIcon = dynamic(dynamicIconImports[name])

	return (
		<LucideIcon
			aria-hidden="true"
			className={cn(spinnerVariants({ size, className }))}
			{...props}
		/>
	);
};
