'use client';
import { Textarea } from '@mantine/core';
import { Control, Controller } from 'react-hook-form';

interface ITextAreaDetailProps {
  name: string;
  control: Control<any>;
  rules?: any;
  placeholder: string;
  label: string;
  variant?: 'filled' | 'unstyled';
  disabled?: boolean;
  withAsterisk?: boolean;
}

const TextAreaDetail = (props: ITextAreaDetailProps) => {
  const { control, disabled, label, name, placeholder, variant, rules, withAsterisk } = props || {};

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Textarea
          placeholder={placeholder}
          label={label}
          error={error?.message}
          variant={variant}
          disabled={disabled}
          withAsterisk={withAsterisk}
          onChange={onChange}
          value={value}
        />
      )}
    />
  );
};

export default TextAreaDetail;
