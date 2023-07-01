import { forwardRef, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import {
	Button as AriaButton,
	ButtonProps as AriaButtonProps,
} from 'react-aria-components';

import { cn } from '~/src/lib/utils';

const buttonVariants = cva(
	'inline-flex select-none items-center justify-center gap-2 rounded-lg text-sm font-medium outline-none transition-colors disabled:pointer-events-none disabled:opacity-50 data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring',
	{
		variants: {
			variant: {
				default:
					'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900',
				danger:
					'text-red-600 hover:bg-red-100 data-[focus-visible=true]:bg-red-100 data-[focus-visible=true]:ring-red-600',
				outline:
					'border-2 border-slate-200 bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900',
				ghost:
					'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900',
				link: 'text-slate-900 underline-offset-4 hover:underline',
			},
			size: {
				xs: 'px-2 py-1 text-xs',
				sm: 'px-3 py-2 text-sm',
				md: 'px-3 py-2 text-base',
				lg: 'px-4 py-2 text-lg',
				icon: 'h-9 w-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'sm',
		},
	},
);

export interface ButtonProps
	extends AriaButtonProps,
		VariantProps<typeof buttonVariants> {
	icon?: ReactNode;
	iconPlacement?: 'left' | 'right';
	isBusy?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = 'default',
			size = 'sm',
			isBusy = false,
			iconPlacement = 'left',
			icon,
			className,
			children,
			...props
		},
		ref,
	) => {
		const icn = isBusy ? (
			<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
		) : (
			icon
		);

		return (
			<AriaButton
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			>
				{renderProps => (
					<>
						{iconPlacement === 'left' && icn}
						{typeof children === 'function' ? children(renderProps) : children}
						{iconPlacement === 'right' && icn}
					</>
				)}
			</AriaButton>
		);
	},
);

Button.displayName = 'Button';
