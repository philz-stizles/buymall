type Props = {
  title: string;
  description: string;
};

const DashboardHeading = ({ title, description }: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-1 text-slate-700">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default DashboardHeading;
