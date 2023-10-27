type BadgeProps = {
  value: string | number;
  color?: string;
};

const Badge = ({ value }: BadgeProps) => {
  return <div className="flex justify-center items-center rounded-full font-semibold text-xs">{value}</div>;
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