import classNames from 'classnames';

type Props = {
  cols: string[];
};

const TableHead = ({ cols }: Props) => {
  return (
    <thead className="[&_tr]:border-b">
      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted border-slate-300">
        {cols.map((col) => (
          <th
            key={col}
            scope="col"
            className={classNames(
              'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'
            )}
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
