import classNames from 'classnames';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  isValid?: boolean;
  isTouched?: boolean;
  info?: string;
}

const TextArea = ({
  id,
  label,
  placeholder,
  autoCapitalize = 'none',
  autoCorrect = 'off',
  info,
  className,
  ...rest
}: TextAreaProps) => {
  const inputId =
    id ??
    (label && typeof label === 'string'
      ? label.replace(' ', '-').toLowerCase()
      : undefined);

  return (
    <div
      className={classNames('relative flex flex-col w-full mb-2', className)}
    >
      {/* {label && <label className="sr-only font-semibold mb-1">{label}</label>} */}
      {label && (
        <label
          htmlFor={inputId}
          className="block font-medium leading-none mb-2 text-slate-600 text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        className={classNames('input')}
        placeholder={placeholder}
        rows={3}
        {...rest}
      ></textarea>
      {info && <small className="text-xs text-slate-500 mt-1">{info}</small>}
    </div>
  );
};

export default TextArea;
