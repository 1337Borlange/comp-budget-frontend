'use client';
import React, { useRef } from 'react';
import '../styles/components/toggleswitch.scss';

export type ToggleSwitchProps = {
  id: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
  optionLabels?: string[];
  small?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  label?: string;
};

const ToggleSwitch = ({
  id,
  name,
  checked,
  onChange,
  defaultChecked,
  optionLabels = ['Yes', 'No'],
  small,
  disabled,
  label,
}: ToggleSwitchProps) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const handleKeyPress = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.code !== 'Enter' && e.code !== 'Space') return;
    if (onChange) {
      e.preventDefault();
      onChange(!checked);
    } else {
      if (labelRef?.current) {
        labelRef.current.click();
      }
    }
  };

  const inputProps = {
    className: 'toggle-switch-checkbox',
    type: 'checkbox',
    name,
    id,
    checked,
    defaultChecked,
    onChange,
  } as React.HTMLAttributes<HTMLInputElement>;

  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <div
        className={`toggle-switch ${small ? ' small-switch' : ''}`}
        role="switch"
        aria-checked={checked}>
        <input {...inputProps} />
        {id ? (
          <label
            className="toggle-switch-label"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => handleKeyPress(e)}
            htmlFor={id}
            ref={labelRef}>
            <span
              className={
                disabled ? 'toggle-switch-inner toggle-switch-disabled' : 'toggle-switch-inner'
              }
              data-yes={optionLabels[0]}
              data-no={optionLabels[1]}
              tabIndex={-1}
            />
            <span
              className={
                disabled ? 'toggle-switch-switch toggle-switch-disabled' : 'toggle-switch-switch'
              }
              tabIndex={-1}
            />
          </label>
        ) : null}
      </div>
    </>
  );
};

export default ToggleSwitch;
