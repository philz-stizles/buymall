import { EmptyState } from '../../../../../../../components/ui';
import { SubCategory } from '../../../../../../../models/sub-category';
import TableBody from './components/TableBody/TableBody';
import TableHead from './components/TableHead/TableHead';

type Props = {
  cols: string[];
  rows: SubCategory[];
};

const SubCategoryTable = ({ cols, rows }: Props) => {
  return (
    <div className="rounded-md border bg-white">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <TableHead cols={cols} />
          <TableBody rows={rows} />
        </table>
      </div>
    </div>
  );
};

export default SubCategoryTable;
