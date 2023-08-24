import { getClasses } from '@/lib/style-helpers';
import { Spacings } from '@/lib/types';
import React from 'react';
import '../styles/components/divider.scss';

export interface DividerProps {
  color?: string;
  spacing: Spacings;
  mobileSpacing?: Spacings;
}

const Divider: React.FunctionComponent<
  DividerProps & React.HTMLAttributes<HTMLDivElement>
> = ({ color, spacing = 'large', mobileSpacing, className, ...rest }) => {
  const classes = getClasses({
    [`mt-${spacing || 'none'}`]: !!spacing,
    [`mb-${spacing || 'none'}`]: !!spacing,
    [`mobile-mt-${mobileSpacing || 'none'}`]: !!mobileSpacing,
    [`mobile-mb-${mobileSpacing || 'none'}`]: !!mobileSpacing,
  });

  const inlineStyle = {
    ...(color && { ['--divider-color']: color }),
  } as any;
  return (
    <div
      className={`divider ${classes} ${className ? ` ${className}` : ''}`}
      style={inlineStyle}
      {...rest}
    />
  );
};

export default Divider;
