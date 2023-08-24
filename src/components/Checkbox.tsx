import React, { forwardRef } from 'react';
import { FormControl } from './FormControl/FormControl';
import { Label } from './FormControl/Label';
import { getClasses } from '@/lib/style-helpers';
import '../styles/components/checkbox.scss';

export type CheckboxProps = {
  fullWidth?: boolean;
  id: string;
  label: string | JSX.Element;
  value?: string;
  hideLabel?: boolean;
  name?: string;
};

export type StyledCheckboxProps = {
  $fullWidth: boolean;
};

const Checkbox = forwardRef<
  HTMLInputElement,
  CheckboxProps & React.InputHTMLAttributes<HTMLInputElement>
>(
  (
    {
      fullWidth = false,
      id,
      label,
      value = '',
      onChange,
      hideLabel,
      className,
      name = '',
      ...rest
    },
    ref?: React.Ref<HTMLInputElement>
  ) => {
    const classes = getClasses({
      'full-width': fullWidth,
    });
    return (
      <FormControl
        className={`checkbox-wrapper ${classes} ${
          className ? ` ${className}` : ''
        }`}
      >
        <Label htmlFor={id} tabIndex={0}>
          <input
            type="checkbox"
            id={id}
            onChange={onChange}
            name={name}
            value={value}
            {...rest}
            ref={ref}
          />

          {!hideLabel && label}
        </Label>
      </FormControl>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
