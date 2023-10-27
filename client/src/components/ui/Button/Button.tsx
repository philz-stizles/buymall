import { MouseEvent, PropsWithChildren, memo, useMemo } from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { Size, Variant } from '../../../types';
import classNames from 'classnames';

const SIZE = {
  sm: 'text-sm font-medium px-3 py-2',
  md: 'text-sm font-medium px-3 py-2', // px-5 py-2.
  lg: 'text-base font-semibold px-6 py-3',
};

type Props = {
  className?: string;
  outlined?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  size?: Size;
  variant?: Variant;
  expanded?: boolean;
  isHoverable?: boolean;
  label?: string;
  iconRight?: IconType;
  iconLeft?: IconType;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Button = memo(
  ({
    className,
    children,
    label,
    size = 'md',
    variant = 'primary',
    expanded = false,
    type = 'button',
    isHoverable = true,
    iconLeft: IconLeft,
    iconRight: IconRight,
    href = '',
    disabled = false,
    loading = false,
    onClick,
  }: PropsWithChildren<Props>) => {
    const classes = useMemo(() => {
      const sizeClass = SIZE[size];
      const variants: { [key: string]: string } = {
        flat: `border-none`,
        black: `bg-slate-950 border-slate-950 text-white`,
        outlined: `border-slate-700 text-slate-700`,
        white: `text-black bg-white`,
        green: `text-white bg-green-600 ${isHoverable && 'hover:bg-green-700'}`,
        primary: `bg-[#115DFC] border-[#115DFC] text-white ${
          isHoverable && 'hover:bg-[#115DFC]'
        }`,
        danger: `text-white bg-red-600 ${isHoverable && 'hover:bg-red-700'}`,
        secondary: `text-indigo-700 bg-indigo-100 ${
          isHoverable && 'hover:bg-indigo-200'
        }`,
      };
      return classNames(
        'flex justify-center items-center gap-1 rounded-md outline-none border-2 cursor-pointer transition',
        sizeClass,
        variants[variant],
        expanded && 'w-full',
        className
      );
    }, [className, expanded, isHoverable, size, variant]);

    const content = (
      <>
        {IconLeft && <IconLeft size={20} />}
        <span> {label || children}</span>
        {IconRight && <IconRight size={20} />}
      </>
    );
    return href ? (
      <Link to={href} className={classes}>
        {content}
      </Link>
    ) : (
      <button
        disabled={disabled || loading}
        type={type}
        onClick={onClick}
        className={classes}
      >
        {loading ? <Spinner /> : content}
      </button>
    );
  }
);

// width: 100%;
//   border-radius: 7px;

export default Button;
