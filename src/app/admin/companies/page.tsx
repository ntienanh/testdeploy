'use client';
import React from 'react';

const CompanyPage = () => {
  // value cua input can nhap vao list todo
  const [inputValue, setInputValue] = React.useState('');

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div>CompanyPage</div>
      <input onChange={inputChange} value={inputValue} />
      <div>Input value</div>
    </>
  );
};

export default CompanyPage;
