'use client';
import React from 'react';
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
}: ToggleSwitchProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.code !== 'Enter' && e.code !== 'Space') return;

    e.preventDefault();
    if (onChange) onChange(!checked);
  };

  const inputProps = {
    className: 'toggle-switch-checkbox',
    type: 'checkbox',
    name,
    id,
    ...(typeof checked !== 'undefined' && { checked }),
    ...(typeof defaultChecked !== 'undefined' && { defaultChecked }),
    ...(typeof onChange !== 'undefined' && { onChange }),
  } as React.HTMLAttributes<HTMLInputElement>;

  return (
    <div
      className={`toggle-switch ${small ? ' small-switch' : ''}`}
      role="switch"
      aria-checked={checked}
    >
      <input {...inputProps} />
      {id ? (
        <label
          className="toggle-switch-label"
          tabIndex={disabled ? -1 : 1}
          onKeyDown={(e) => handleKeyPress(e)}
          htmlFor={id}
        >
          <span
            className={
              disabled
                ? 'toggle-switch-inner toggle-switch-disabled'
                : 'toggle-switch-inner'
            }
            data-yes={optionLabels[0]}
            data-no={optionLabels[1]}
            tabIndex={-1}
          />
          <span
            className={
              disabled
                ? 'toggle-switch-switch toggle-switch-disabled'
                : 'toggle-switch-switch'
            }
            tabIndex={-1}
          />
        </label>
      ) : null}
    </div>
  );
};

export default ToggleSwitch;
