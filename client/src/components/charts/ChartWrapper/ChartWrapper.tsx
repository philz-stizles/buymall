import classNames from 'classnames';
import React from 'react';
import { IoMdMore } from 'react-icons/io';

type Props = {
  className?: string;
  title?: string;
  children: React.ReactNode;
};

const ChartWrapper = ({ title, className, children }: Props) => {
  return (
    <div
      className={classNames(
        'bg-white rounded-lg p-6 pb-4 w-full border border-slate-200',
        className
      )}
    >
      <div className="flex justify-between items-center mb-8">
        {title && (
          <h2 className="font-semibold leading-none tracking-tight text-slate-700">
            {title}
          </h2>
        )}
        <IoMdMore size={24} />
      </div>
      {children}
    </div>
  );
};

export default ChartWrapper;
