import {
  ChangeEvent,
  FocusEvent,
  Ref,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { IconType } from "react-icons";
import { IoEye, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

type InputProps = {
  className?: string;
  disabled?: boolean;
  label?: string;
  icon?: IconType;
  placeholder?: string;
  type?: string;
  value?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  isValid?: boolean;
  textarea?: boolean;
  message?: string;
};

const Input = forwardRef(
  (
    {
      name,
      required = false,
      textarea = false,
      className,
      label,
      icon: Icon,
      placeholder,
      type,
      value,
      onChange,
      onBlur,
      disabled,
      isValid,
      message,
    }: InputProps,
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
      label && typeof label === "string"
        ? label.replaceAll(" ", "-").toLowerCase()
        : undefined;

    const inputClassName = `w-auto py-0 pt-0 ${
      Icon ? "pl-[40px]" : "pl-3"
    } outline-none border border-slate-300 rounded-md transition text-sm placeholder:text-sm focus:outline-none focus:border-indigo-500`;

    const content = textarea ? (
      <textarea
        required={required}
        name={name}
        className={inputClassName}
        rows={4}
      ></textarea>
    ) : (
      <input
        autoComplete="off"
        id={inputId}
        name={name}
        disabled={disabled}
        className={`h-[40px] ${inputClassName}`}
        type={isVisible ? 'text' : type || "text"}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        ref={ref}
        required={required}
      />
    );

    return (
      <div
        className={`w-full relative h-fit flex flex-col${
          className ? ` ${className}` : ""
        }`}
      >
        {label && (
          <label
            htmlFor={inputId}
            className="block font-semibold text-sm text-slate-600 mb-2"
          >
            {label}
          </label>
        )}
        {Icon && (
          <Icon
            size={20}
            className="absolute left-[12px] z-[99] bottom-[9px]"
          />
        )}
        {content}
        {type === "password" && isVisible && (
          <IoEyeOutline
            size={20}
            className="absolute right-[12px] z-[99] bottom-[9px] cursor-pointer"
            onClick={() => {
              setIsVisible(false);
            }}
          />
        )}
        {type === "password" && !isVisible && (
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
