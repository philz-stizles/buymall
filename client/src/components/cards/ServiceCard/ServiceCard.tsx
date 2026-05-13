import { IconType } from 'react-icons';

export type Feature = {
  id: string;
  icon: IconType;
  title: string;
  description: string;
};

type Props = {
  item: Feature;
};

const ServiceCard = ({ item: { title, icon: Icon, description } }: Props) => {
  return (
    <div className="flex items-center justify-center gap-6 bg-slate-50 border border-slate-200 rounded-lg py-8 px-6">
      <div>
        <Icon size={36} />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="font-light text-slate-600">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
