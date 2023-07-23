'use client';

import { cn } from '~/src/lib/utils';
import { Icon, IconProps } from '../icon/icon';

interface SpinnerProps extends Omit<IconProps, 'name'> {}

export const Spinner = (props: SpinnerProps) => (
	<Icon
		{...props}
		name="loader-2"
		className={cn('animate-spin', props.className)}
	/>
);
