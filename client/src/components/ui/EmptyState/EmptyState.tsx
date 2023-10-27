import { IconType } from "react-icons"

type Props = {
    title: string,
    description: string
    icon?: IconType
}

const EmptyState = ({ title, description, icon: Icon}: Props) => {
  return (
    <div className="flex flex-col justify-center items-center h-[50vh]">
      {Icon && <Icon className="mb-6 text-slate-300" size={64} />}
      <h2 className="text-xl font-medium mb-2 text-center text-slate-400">
        {title}
      </h2>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}

export default EmptyState