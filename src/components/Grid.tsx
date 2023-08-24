import { getClasses } from '@/lib/style-helpers';
import { AlignItems, Direction, Justify, Spacings } from '@/lib/types';
import React from 'react';
import '../styles/components/grid.scss';

export interface GridProps {
  spacing: Spacings;
  direction?: Direction;
  // mobileDirection?: Direction;
  justifyContent?: Justify;
  alignItems?: AlignItems;
  width?: string;
  mobileSpacing?: Spacings;
}

const Grid: React.FunctionComponent<
  GridProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  spacing = 'small',
  direction = 'row',
  justifyContent = 'space-between',
  alignItems = 'stretch',
  children,
  mobileSpacing,
  // mobileDirection,
  width = '100%',
  className,
  ...rest
}) => {
  const classes = getClasses({
    [`flex-align-${alignItems}`]: !!alignItems,
    [`flex-justify-${justifyContent}`]: !!justifyContent,
    [`flex-direction-${direction}`]: !!direction,
    [`child-spacing-${spacing}`]: !!spacing,
    [`child-mobile-spacing-${mobileSpacing || 'none'}`]: !!mobileSpacing,
  });

  return (
    <div
      className={`row ${classes} ${className ? ` ${className}` : ''}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Grid;
