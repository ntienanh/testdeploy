'use client';
import { TextInput } from '@mantine/core';
import { Control, Controller } from 'react-hook-form';

interface ITextInputDetailProps {
  placeholder: string;
  label: string;
  variant?: 'filled' | 'unstyled';
  disabled?: boolean;
  withAsterisk?: boolean;
  error: string;
  value: any;
  onChange: any;
}

const TextInputDetail = (props: ITextInputDetailProps) => {
  const { disabled, label, placeholder, variant, withAsterisk, value, onChange, error } = props || {};

  return (
    <TextInput
      placeholder={placeholder}
      label={label}
      error={error}
      variant={variant}
      disabled={disabled}
      withAsterisk={withAsterisk}
      onChange={onChange}
      value={value || null}
    />
  );
};

export default TextInputDetail;
