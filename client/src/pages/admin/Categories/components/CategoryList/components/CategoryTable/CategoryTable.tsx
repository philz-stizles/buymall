import { EmptyState } from '../../../../../../../components/ui';
import { Category } from '../../../../../../../models/category';
import TableBody from './components/TableBody/TableBody';
import TableHead from './components/TableHead/TableHead';

type Props = {
  cols: string[];
  rows: Category[];
};

const CategoryTable = ({ cols, rows }: Props) => {
  return (
    <div className="rounded-md border bg-white">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <TableHead cols={cols} />
          {rows.length <= 0 && (
            <tr className="">
              <td
                colSpan={6}
                className="text-xl font-medium text-center text-slate-400"
              >
                <EmptyState title="No sub categories" description="" />
              </td>
            </tr>
          )}
          {rows.length > 0 && <TableBody rows={rows} />}
        </table>
      </div>
    </div>
  );
};

export default CategoryTable;
