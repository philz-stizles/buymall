import classNames from 'classnames';
import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  description?: string;
  outlined?: boolean;
};

const Checkbox = ({ label, description, outlined = false, ...rest }: Props) => {
  const inputId =
    label && typeof label === 'string'
      ? label.replace(' ', '-').toLowerCase()
      : undefined;

  const checkboxInput = <input id={inputId} type="checkbox" {...rest} />;

  return label ? (
    <label
      htmlFor={inputId}
      className={classNames(
        'inline-flex items-start gap-2',
        outlined && 'border rounded-md p-4'
      )}
    >
      {checkboxInput}
      <span className="flex flex-col justify-start gap-1.5 leading-none text-sm">
        <span className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </span>
        {description && (
          <span className="text-muted-foreground">{description}</span>
        )}
      </span>
    </label>
  ) : (
    checkboxInput
  );
};

export default Checkbox;
