import { IconType } from 'react-icons';
import { Size, Variant } from '../../../types';
import classNames from 'classnames';
import { ButtonHTMLAttributes, MouseEventHandler } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: IconType;
  onClick?: MouseEventHandler;
  size?: Size;
  children?: React.ReactNode;
  variant?: Variant;
  isHoverable?: boolean;
  srOnly?: string;
  rounded?: boolean;
};

const SIZE: { [key: string]: string } = {
  xs: 'p-1',
  sm: 'p-1.5',
  md: 'p-1.5',
  lg: 'p-1.5',
};

const ICONSIZE: { [key: string]: number } = {
  xs: 18,
  sm: 18,
  md: 24,
  lg: 28,
};

const IconButton = ({
  srOnly,
  rounded = false,
  icon: Icon,
  size = 'xs',
  isHoverable,
  variant = 'flat',
  children,
  ...rest
}: Props) => {
  const variants: { [key: string]: string } = {
    flat: `border-none`,
    black: `bg-slate-950 border-slate-950 text-white`,
    outlined: 'border border-input bg-transparent p-1.5',
    white: `text-slate-600 bg-white border shadow-md`,
    green: `text-white bg-green-600 ${isHoverable && 'hover:bg-green-700'}`,
    primary: `bg-[#115DFC] border-[#115DFC] text-white ${
      isHoverable && 'hover:bg-[#115DFC]'
    }`,
    danger: `text-white bg-red-600 border-red-600 ${
      isHoverable && 'hover:bg-red-700'
    }`,
    secondary: `text-indigo-700 bg-indigo-100 ${
      isHoverable && 'hover:bg-indigo-200'
    }`,
  };
  return (
    <button
      type="button"
      className={classNames(
        'items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground hidden p-0 lg:flex hover:scale-110 transition',
        variants[variant],
        SIZE[size],
        rounded && 'rounded-full'
      )}
      {...rest}
    >
      {srOnly && <span className="sr-only">{srOnly}</span>}
      {Icon ? <Icon size={ICONSIZE[size]} /> : children}
    </button>
  );
};

export default IconButton;
