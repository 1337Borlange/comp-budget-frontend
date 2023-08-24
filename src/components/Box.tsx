import { getClasses } from '@/lib/style-helpers';
import { AlignItems, Direction, Justify, Spacings } from '@/lib/types';
import React, { forwardRef } from 'react';
import '../styles/components/box.scss';

export type BoxProps = {
  backgroundColor?: string;
  width?: string;
  color?: string;
  topSpacing?: Spacings;
  bottomSpacing?: Spacings;
  leftSpacing?: Spacings;
  rightSpacing?: Spacings;
  spacing?: Spacings;
  alignItems?: AlignItems;
  justifyContent?: Justify;
  zIndex?: number;
  flexDirection?: Direction;
};

const Box = forwardRef<
  HTMLDivElement,
  BoxProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      width,
      color,
      topSpacing,
      bottomSpacing,
      leftSpacing,
      rightSpacing,
      spacing,
      alignItems = 'flex-start',
      justifyContent = 'flex-start',
      zIndex,
      backgroundColor,
      flexDirection = 'column',
      className,
      ...rest
    },
    ref?: React.Ref<HTMLDivElement>
  ) => {
    const classes = getClasses({
      [`flex-align-${alignItems}`]: !!alignItems,
      [`flex-justify-${justifyContent}`]: !!justifyContent,
      [`flex-direction-${flexDirection}`]: !!flexDirection,
      [`padding-${spacing || 'none'}`]: !!spacing,
      [`pt-${topSpacing || 'none'}`]: !!topSpacing && !spacing,
      [`pb-${bottomSpacing || 'none'}`]: !!bottomSpacing && !spacing,
      [`pr-${rightSpacing || 'none'}`]: !!rightSpacing && !spacing,
      [`pl-${leftSpacing || 'none'}`]: !!leftSpacing && !spacing,
    });
    const inlineStyle = {
      ...(backgroundColor && { ['--box-background']: backgroundColor }),
      ...(color && { ['--box-color']: color }),
    } as any;
    return (
      <div
        ref={ref}
        className={`box ${classes} ${className ? ` ${className}` : ''}`}
        style={inlineStyle}
        {...rest}
      />
    );
  }
);

Box.displayName = 'Box';
export default Box;
