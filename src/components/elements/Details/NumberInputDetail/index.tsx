'use client';
import { NumberInput } from '@mantine/core';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface INumberInputDetailProps {
  name: string;
  control: Control<any>;
  rules?: any;
  placeholder: string;
  label: string;
  withAsterisk?: boolean;
}

const NumberInputDetail = (props: INumberInputDetailProps) => {
  const { control, name, label, placeholder, rules, withAsterisk } = props || {};

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <NumberInput
          placeholder={placeholder}
          label={label}
          decimalSeparator=','
          step={0.1}
          precision={1}
          max={4}
          min={0}
          error={error?.message}
          onChange={onChange}
          value={value | 0}
          withAsterisk={withAsterisk}
        />
      )}
    />
  );
};

export default NumberInputDetail;
