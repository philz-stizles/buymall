import classNames from 'classnames';

type Props = {
  className?: string;
  title?: string;
  subTitle?: string;
};

const Heading = ({ title, subTitle, className }: Props) => {
  return (
    <div className={classNames('pb-8 max-w-xl', className)}>
      {title && <h5 className="text-slate-500 mb-1">{`- ${title}`}</h5>}
      {subTitle && <h2 className="text-4xl font-bold">{subTitle}</h2>}
    </div>
  );
};

export default Heading;
