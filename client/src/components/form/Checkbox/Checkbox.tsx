import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Checkbox = ({ label, ...rest }: Props) => {
  const inputId =
    label && typeof label === 'string'
      ? label.replace(' ', '-').toLowerCase()
      : undefined;

  const checkboxInput = <input id={inputId} type="checkbox" {...rest} />;

  return label ? (
    <label
      htmlFor={inputId}
      className="inline-flex items-center gap-2 font-medium text-sm text-slate-600 mb-2"
    >
      {checkboxInput}
      {label}
    </label>
  ) : (
    checkboxInput
  );
};

export default Checkbox;
