import { forwardRef, RefObject } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import {
	AriaButtonProps,
	mergeProps,
	useButton,
	useFocusRing,
	useHover,
} from 'react-aria';

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
	className?: string;
	'aria-disabled'?: boolean | 'true' | 'false';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant, size, className, ...props }, ref) => {
		const { children } = props;
		const { buttonProps, isPressed } = useButton(
			props,
			ref as RefObject<HTMLButtonElement>,
		);
		const { focusProps, isFocused, isFocusVisible } = useFocusRing(props);
		const { hoverProps, isHovered } = useHover(props);

		return (
			<button
				{...mergeProps(buttonProps, focusProps, hoverProps)}
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				aria-disabled={props['aria-disabled'] || undefined}
				data-pressed={isPressed || undefined}
				data-hovered={isHovered || undefined}
				data-focused={isFocused || undefined}
				data-focus-visible={isFocusVisible || undefined}
			>
				{children}
			</button>
		);
	},
);

Button.displayName = 'Button';
