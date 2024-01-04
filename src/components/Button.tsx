'use client';

import { getClasses } from '@/lib/style-helpers';
import React, { forwardRef } from 'react';
import '../styles/components/button.scss';
import { LoadingIcon } from './Icons/LoadingIcon';

export type ButtonProps = {
  priority?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'critical';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  children: React.ReactNode;
  upperCase?: boolean;
  smallText?: boolean;
  iconLeft?: boolean;
  iconOnly?: boolean;
  loading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps & React.HTMLAttributes<HTMLButtonElement>>(
  (
    {
      children,
      priority = 'primary',
      disabled = false,
      type = 'button',
      fullWidth = false,
      upperCase = false,
      smallText = false,
      iconLeft = false,
      iconOnly = false,
      loading = false,
      className,
      ...rest
    },
    ref?: React.Ref<HTMLButtonElement>,
  ) => {
    const classes = getClasses({
      'full-width': fullWidth,
      uppercase: upperCase,
      'small-text': smallText,
      'icon-only': iconOnly,
      [`icon-${iconLeft ? 'left' : 'right'}`]: true,
    });

    const inlineStyle: any = {
      ['--ripple-background']: `var(--color-button-${priority}-hover)`,
    };

    return (
      <button
        style={inlineStyle}
        aria-label={type}
        className={`button ${priority} ${classes} ${className ? ` ${className}` : ''}`}
        type={type}
        disabled={disabled || loading}
        ref={ref}
        {...rest}>
        {loading ? 'Loading...' : children}
        {loading && <LoadingIcon />}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
