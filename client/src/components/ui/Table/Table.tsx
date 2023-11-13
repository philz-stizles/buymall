import { MdDelete, MdDeleteOutline, MdModeEditOutline } from 'react-icons/md';
import './Table.css';
import { ColumnProps } from '../../../types';

type Props<T> = {
  columns: ColumnProps<T>[];
  rows?: T[];
};

const Table = <T,>({ columns, rows }: Props<T>) => {
  const renderTHead = () => (
    <thead className="[&_tr]:border-b">
      {columns.map((column, index) => (
        <th
          key={`headCell-${index}`}
          className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
        >
          {column.title}
        </th>
      ))}
    </thead>
  );

  const renderTBody = () => (
    <tbody>
      {rows?.map((row, index) => (
        // bg-white px-6 p-4
        // border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted
        <tr key={index} className="rounded-lg border-b border-slate-200 transition-colors bg-white hover:bg-indigo-50 data-[state=selected]:bg-muted text-slate-600"></tr>
      ))}
    </tbody>
  );

  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen flex justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded"></div>
          <table className="min-w-max w-full table-auto caption-bottom text-sm">
            {renderTHead()}
            {renderTBody()}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
