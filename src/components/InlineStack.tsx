import { getClasses } from '@/lib/style-helpers';
import { AlignItems, Justify, Spacings } from '@/lib/types';
import React from 'react';
import '../styles/components/inlinestack.scss';

export type InlineStackProps = {
  spacing: Spacings;
  children: React.ReactNode;
  justifyContent?: Justify;
  alignItems?: AlignItems;
};

export const InlineStack: React.FunctionComponent<
  InlineStackProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  spacing,
  children,
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  className,
  ...rest
}) => {
  const classes = getClasses({
    [`flex-align-${alignItems}`]: !!alignItems,
    [`flex-justify-${justifyContent}`]: !!justifyContent,
    [`gap-${spacing}`]: !!spacing,
  });
  return (
    <div
      className={`inline-stack ${classes} ${className ? ` ${className}` : ''}`}
      {...rest}
    >
      {React.Children.map(children, (child) => {
        if (!child) return null;
        return <div>{child}</div>;
      })}
    </div>
  );
};
