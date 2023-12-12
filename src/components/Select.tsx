'use client';

import React, { forwardRef } from 'react';

import { FormControl } from './FormControl/FormControl';
import { Label } from './FormControl/Label';

import '../styles/components/select.scss';

export type SelectProps = {
  label: string;
  hideLabel?: boolean;
  error?: string;
  fullWidth?: boolean;
  required?: boolean;
  requiredText?: string;
  disabled?: boolean;
  errorBox?: boolean;
  name?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps & React.HTMLAttributes<HTMLSelectElement>>(
  (
    {
      children,
      hideLabel,
      label,
      id,
      fullWidth,
      required,
      requiredText = '*',
      error,
      errorBox,
      name,
      ...rest
    },
    ref?: React.Ref<HTMLSelectElement>,
  ) => {
    return (
      <FormControl fullWidth={fullWidth}>
        {!hideLabel && (
          <Label htmlFor={id}>
            {label}
            {required && <span className="required-symbol">{requiredText}</span>}
          </Label>
        )}
        <div className="select-wrapper">
          <select id={id} ref={ref} required={required} name={name} {...rest}>
            {children}
          </select>
          <span className="focus"></span>
        </div>
        {error && error.length > 0 && (
          <div className={`base-form-input-error ${errorBox ? 'fill' : ''}`}>{error}</div>
        )}
      </FormControl>
    );
  },
);

Select.displayName = 'Select';

export default Select;
