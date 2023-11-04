import React from 'react';

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: { id: string; name: string }[];
};

const Select = ({ label, options, ...rest }: Props) => {
  const inputId =
    label && typeof label === 'string'
      ? label.replace(' ', '-').toLowerCase()
      : undefined;
  return (
    <div className="w-full relative h-fit flex flex-col">
      {label && (
        <label
          htmlFor={inputId}
          className="block font-medium text-sm text-slate-600 mb-2"
        >
          {label}
        </label>
      )}
      <select
        className="h-[40px] px-2 outline-none border border-slate-300 text-slate-600 rounded-md transition text-sm"
        {...rest}
      >
        {[
          <option key={0}>Please select</option>,
          ...options.map((option) => {
            return (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            );
          }),
        ]}
      </select>
    </div>
  );
};

export default Select;
