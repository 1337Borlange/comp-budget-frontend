import React, { forwardRef } from 'react';
import { FormControl } from './FormControl/FormControl';
import { Label } from './FormControl/Label';
import { getClasses } from '@/lib/style-helpers';
import '../styles/components/radiobutton.scss';

export type RadiobuttonProps = {
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

const Radiobutton = forwardRef<
  HTMLInputElement,
  RadiobuttonProps & React.InputHTMLAttributes<HTMLInputElement>
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
    ref?: React.Ref<HTMLInputElement>,
  ) => {
    const classes = getClasses({
      'full-width': fullWidth,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <FormControl className={`radiobutton-wrapper ${classes} ${className ? ` ${className}` : ''}`}>
        <Label htmlFor={id} tabIndex={0}>
          <input
            type="radio"
            id={id}
            onChange={(e) => handleChange(e)}
            name={name}
            value={value}
            {...rest}
            ref={ref}
          />

          {!hideLabel && label}
        </Label>
      </FormControl>
    );
  },
);

Radiobutton.displayName = 'Radiobutton';

export default Radiobutton;
