import classNames from 'classnames';
import { Ref, forwardRef, useImperativeHandle, useState } from 'react';
import { IconType } from 'react-icons';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  disabled?: boolean;
  label?: string;
  icon?: IconType;
  type?: string;
  name?: string;
  required?: boolean;
  isValid?: boolean;
  message?: string;
}

const Input = forwardRef(
  (
    {
      id,
      name,
      required = false,
      className,
      label,
      icon: Icon,
      type = 'text',
      disabled,
      isValid,
      message,
      ...rest
    }: Props,
    ref: Ref<HTMLInputElement>
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const activate = () => {};

    useImperativeHandle(ref, () => {
      return {
        focus: activate,
      } as HTMLInputElement;
    });
    const inputId =
      id ??
      (label && typeof label === 'string'
        ? label.replace(' ', '-').toLowerCase()
        : undefined);

    // class="flex h-10 w-full px-3 py-2 bg-background border-input placeholder:text-muted-foreground focus-visible:ring-ring ring-offset-background"
    const content = (
      <input
        autoComplete="off"
        id={inputId}
        name={name}
        disabled={disabled}
        className={classNames(
          'input h-[40px] w-auto py-0 pt-0',
          Icon ? 'pl-[40px]' : 'pl-3'
        )}
        type={isVisible ? 'text' : type || 'text'}
        ref={ref}
        required={required}
        {...rest}
      />
    );
    return (
      <div
        className={`w-full relative h-fit flex flex-col mb-2${
          className ? ` ${className}` : ''
        }`}
      >
        {label && (
          <label
            htmlFor={inputId}
            className="flex gap-0.5 font-medium text-sm text-slate-900 mb-2"
          >
            <span>{label}</span>
            {required && <span className="text-rose-500 font-semibold">*</span>}
          </label>
        )}
        {Icon && (
          <Icon
            size={20}
            className="absolute left-[12px] z-[99] bottom-[9px]"
          />
        )}
        {content}
        {type === 'password' && isVisible && (
          <IoEyeOutline
            size={20}
            className="absolute right-[12px] z-[99] bottom-[9px] cursor-pointer"
            onClick={() => {
              setIsVisible(false);
            }}
          />
        )}
        {type === 'password' && !isVisible && (
          <IoEyeOffOutline
            size={20}
            className="absolute right-[12px] z-[99] bottom-[9px] cursor-pointer"
            onClick={() => {
              setIsVisible(true);
            }}
          />
        )}
        {isValid && <small className="text-slate-500">{message}</small>}
      </div>
    );
  }
);

// .input_label {
//   font-size: 0.75rem;
//   color: #8B8E98;
//   font-weight: 600;
// }

// .input_field {
//   height: 40px;
//   padding: 0 0 0 40px;
//   border-radius: 7px;
//   border: 1px solid #e5e5e5;
//   filter: drop-shadow(0px 1px 0px #efefef)
//     drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
//   transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
// }

// .input_field:focus {
//   border: 1px solid transparent;
//   box-shadow: 0px 0px 0px 2px #242424;
//   background-color: transparent;
// }

export default Input;
