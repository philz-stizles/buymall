import classNames from "classnames";

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
  ...rest
}: TextAreaProps) => {
  const inputId =
    id ??
    (label && typeof label === 'string'
      ? label.replace(' ', '-').toLowerCase()
      : undefined);
  const inputClassName = `p-4 w-auto outline-none border border-slate-300 rounded-md transition text-sm placeholder:text-sm focus:outline-none focus:border-indigo-500`;
  return (
    <div className="relative flex flex-col w-full mb-2">
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
