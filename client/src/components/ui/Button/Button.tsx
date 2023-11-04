import { MouseEvent, PropsWithChildren, memo, useMemo } from 'react';
import { IconType } from 'react-icons';
import Spinner from '../Spinner/Spinner';
import { Size, Variant } from '../../../../src/types';
import classNames from 'classnames';
import { motion } from 'framer-motion';

const SIZE = {
  sm: 'text-xs font-medium px-2.5 py-1.5',
  md: 'text-sm font-medium px-3 py-2', // px-5 py-2.
  lg: 'text-lg font-bold px-6 py-3',
};

type Props = {
  animated?: boolean;
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
    disabled = false,
    loading = false,
    animated = false,
    onClick,
    ...rest
  }: PropsWithChildren<Props>) => {
    const classes = useMemo(() => {
      const sizeClass = SIZE[size];
      const variants: { [key: string]: string } = {
        flat: `border-none`,
        black: `bg-slate-950 border-slate-950 text-white`,
        outlined: `border-slate-300 bg-white text-slate-600`,
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
        'flex justify-center items-center gap-1 rounded-md outline-none border-2 cursor-pointer transition disabled:pointer-events-none disabled:opacity-50',
        sizeClass,
        variants[variant],
        expanded && 'w-full',
        className
      );
    }, [className, expanded, isHoverable, size, variant]);

    const content = (
      <>
        {IconLeft && <IconLeft size={size === 'sm' ? 18 : 20} />}
        <span> {label || children}</span>
        {IconRight && <IconRight size={size === 'sm' ? 18 : 20} />}
      </>
    );

    return animated ? (
      <motion.button
        whileHover={{ scale: 1.1, opacity: 0.8 }}
        transition={{ type: 'spring', stiffness: 500 }}
        disabled={disabled || loading}
        type={type}
        onClick={onClick}
        className={classes}
        {...rest}
      >
        {loading ? <Spinner /> : content}
      </motion.button>
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

export default Button;
