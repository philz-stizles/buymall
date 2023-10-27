type StateCardProps = {
  title: string;
  figure: string;
  meta?: string;
};

const StateCard = ({ title, figure, meta }: StateCardProps) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <div className="text-sm mb-1 text-slate-400">{title}</div>
      <div className="flex gap-3 items-center">
        <div className="text-2xl font-semibold text-slate-900">{figure}</div>
        <small className="text-[10px] bg-emerald-100 text-emerald-700 p-[3px] rounded-lg">{meta}</small>
      </div>
    </div>
  );
};

export default StateCard;
