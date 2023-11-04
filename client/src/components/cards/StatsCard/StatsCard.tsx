import { IconType } from 'react-icons';
import classes from './StatsCard.module.css';
import classNames from 'classnames';

type StatsCardProps = {
  color?: string;
  title: string;
  figure: number | string;
  meta?: number | string;
  icon?: IconType;
};

const StatsCard = ({
  color,
  title,
  figure,
  icon: Icon,
  meta,
}: StatsCardProps) => {
  return (
    <div
      className="flex items-center gap-6 rounded-lg p-8"
      style={{
        backgroundColor: color,
      }}
    >
      {Icon && (
        <div className="flex justify-center items-center rounded-lg p-4 bg-[#0b0a0a]">
          <Icon className="text-white" />
        </div>
      )}
      <div className="self-end">
        <h4 className="text-sm font-semibold text-[#0b0a0a] leading-none mb-3">
          {title}
        </h4>
        <h6 className=" text-xl font-bold text-[#0b0a0a] leading-none">
          {figure}
        </h6>
      </div>
      <small
        className={classNames(
          'text-sm rounded-lg bg-[#0b0a0a] px-2 self-end'
        )}
        style={{
          color: color,
        }}
      >
        {meta}
      </small>
    </div>
  );
};

// background-color: #0b0a0a;
//   border-radius: 7px;
//   padding: 0 0.6rem;
//   align-self: flex-end;
//   font-size: 1rem;
//   margin-bottom: 0.2rem;

export default StatsCard;
