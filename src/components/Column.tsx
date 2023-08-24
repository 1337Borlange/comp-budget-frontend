import { getClasses } from '@/lib/style-helpers';
import { AlignItems, ColumnSize, Justify } from '@/lib/types';
import React from 'react';

export interface ColumnProps {
  xs?: ColumnSize;
  sm?: ColumnSize;
  md?: ColumnSize;
  lg?: ColumnSize;
  xsOffset?: ColumnSize;
  smOffset?: ColumnSize;
  mdOffset?: ColumnSize;
  lgOffset?: ColumnSize;
  alignItems?: AlignItems;
  justifyContent?: Justify;
  flexGrow?: '1' | '0';
}

const Column: React.FunctionComponent<
  ColumnProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  xs = '12',
  sm = '12',
  md = '12',
  lg = '12',
  xsOffset,
  smOffset,
  mdOffset,
  lgOffset,
  children,
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  flexGrow,
  className,
  ...rest
}) => {
  const classes = getClasses({
    [`flex-align-${alignItems}`]: !!alignItems,
    [`flex-justify-${justifyContent}`]: !!justifyContent,
    [`col-lg-${lg}`]: !!lg,
    [`col-md-${md}`]: !!md,
    [`col-sm-${sm}`]: !!sm,
    [`col-xs-${xs}`]: !!xs,
    [`col-xs-offset-${xsOffset}`]: !!xsOffset,
    [`col-sm-offset-${smOffset}`]: !!smOffset,
    [`col-md-offset-${mdOffset}`]: !!mdOffset,
    [`col-lg-offset-${lgOffset}`]: !!lgOffset,
    [`flex-grow-${flexGrow}`]: !!flexGrow,
  });
  return (
    <div
      className={`col ${classes} ${className ? ` ${className}` : ''}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Column;
