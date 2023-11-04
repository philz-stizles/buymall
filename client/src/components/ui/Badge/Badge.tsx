import { motion } from 'framer-motion';

type BadgeProps = {
  value: string | number;
  color?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const Badge = ({ children, onClick, value, color }: BadgeProps) => {
  return (
    <span className="relative max-w-fit max-h-fit">
      <motion.small
        animate={{ scale: [1, 1] }}
        className="cursor-pointer leading-none absolute -right-1 w-3.5 h-3.5 inline-flex justify-center items-center rounded-full font-semibold text-[.5rem] text-[#0b0a0a] bg-rose-400"
        onClick={onClick}
      >
        {value}
      </motion.small>
      {children}
    </span>
  );
};

export default Badge;

// .badge {
//   font-size: 1rem;
//   font-weight: 500;
//   height: 1.75rem;
//   width: 1.75rem;
//   background-color: #ffd43b;
//   color: #0b0a0a;
// }
