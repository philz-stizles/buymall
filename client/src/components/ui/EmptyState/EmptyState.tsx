import { IconType } from 'react-icons';

type Props = {
  title: string;
  description: string;
  icon?: IconType;
};

const EmptyState = ({ title, description, icon: Icon }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center w-full py-12 bg-white">
      {Icon && <Icon className="mb-4 text-indigo-300" size={48} />}

      <h2 className="text-xl font-semibold mb-2 text-center text-slate-600">
        {title}
      </h2>
      <p className="text-slate-500">{description}</p>
    </div>
  );
};

export default EmptyState;
