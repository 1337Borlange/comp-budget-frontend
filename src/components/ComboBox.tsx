'use client';
import { useCombobox } from 'downshift';
import React, { useEffect } from 'react';
import { Label } from './FormControl/Label';
import { FormControl } from './FormControl/FormControl';
import { AngleDownIcon } from './Icons/AngleDownIcon';
import '../styles/components/combobox.scss';

export type ComboOption = {
  id: string;
  title: string;
};

type ComboBoxProps = {
  data: ComboOption[];
  fullWidth?: boolean;
  label: string;
  hideLabel?: boolean;
  disabled?: boolean;
  name?: string;
  defaultValue?: string;
  handleChange?: (val: ComboOption | null | undefined) => void;
};

const filterOptions = (inputValue?: string) => {
  const lowerCasedInputValue = inputValue?.toLowerCase();

  return function booksFilter(item: ComboOption) {
    return (
      !inputValue ||
      !lowerCasedInputValue ||
      item.title.toLowerCase().includes(lowerCasedInputValue) ||
      item.id.toString().toLowerCase().includes(lowerCasedInputValue)
    );
  };
};
const ComboBox: React.FunctionComponent<ComboBoxProps> = ({
  data,
  label,
  fullWidth = false,
  hideLabel = false,
  disabled = false,
  defaultValue,
  name,
  handleChange,
}) => {
  const [items, setItems] = React.useState<ComboOption[]>(data);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setItems(data.filter(filterOptions(inputValue)));
    },
    items,
    initialInputValue: defaultValue,
    itemToString(item) {
      return item ? item.title : '';
    },
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      typeof handleChange === 'function' ? handleChange(newSelectedItem) : null;
    },
  });

  useEffect(() => {
    if (!data.every((d) => items.includes(d))) {
      setItems(data);
    }
  }, [data, items]);

  const inputProps = getInputProps();
  const val = inputProps.value ? inputProps.value : selectedItem?.title ?? '';
  inputProps.value = val;

  return (
    <FormControl fullWidth={fullWidth}>
      {!hideLabel && <Label {...getLabelProps()}>{label}</Label>}
      <div className={`combobox ${disabled && 'disabled'}`}>
        <input name={name} placeholder={label} {...inputProps} disabled={disabled} />
        <button
          aria-label="toggle menu"
          className={`${isOpen && 'open'}`}
          disabled={disabled}
          type="button"
          {...getToggleButtonProps()}>
          <AngleDownIcon />
        </button>
        <ul className={`${!(isOpen && items.length) && 'hidden'}`} {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => (
              <li
                className={`
                  ${highlightedIndex === index && 'highlight'}
                  ${selectedItem === item && 'selected'}
                  `}
                key={`${item.id}${index}`}
                {...getItemProps({ item, index })}>
                <span>{item.title}</span>
              </li>
            ))}
        </ul>
      </div>
    </FormControl>
  );
};

ComboBox.displayName = 'ComboBox';

export default ComboBox;
