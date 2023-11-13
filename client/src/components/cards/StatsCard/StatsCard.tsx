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
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-slate-200 bg-white">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium">{title}</h3>
        {Icon && <Icon size={24} />}
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </div>
    </div>
  );
  // return (
  //   <div
  //     className="flex items-center gap-6 rounded-lg p-8"
  //     style={{
  //       backgroundColor: color,
  //     }}
  //   >
  //     {Icon && (
  //       <div className="flex justify-center items-center rounded-lg p-4 bg-[#0b0a0a]">
  //         <Icon className="text-white" />
  //       </div>
  //     )}
  //     <div className="self-end">
  //       <h4 className="text-sm font-semibold text-[#0b0a0a] leading-none mb-3">
  //         {title}
  //       </h4>
  //       <h6 className=" text-xl font-bold text-[#0b0a0a] leading-none">
  //         {figure}
  //       </h6>
  //     </div>
  //     <small
  //       className={classNames(
  //         'text-sm rounded-lg bg-[#0b0a0a] px-2 self-end'
  //       )}
  //       style={{
  //         color: color,
  //       }}
  //     >
  //       {meta}
  //     </small>
  //   </div>
  // );
};

// background-color: #0b0a0a;
//   border-radius: 7px;
//   padding: 0 0.6rem;
//   align-self: flex-end;
//   font-size: 1rem;
//   margin-bottom: 0.2rem;

export default StatsCard;
