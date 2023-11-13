import classNames from 'classnames';

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={classNames(
        'animate-pulse rounded-md bg-neutral-200',
        className
      )}
      {...props}
    />
  );
};

export default Skeleton;
