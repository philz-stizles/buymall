import classNames from 'classnames';
import { Category } from '../../../../../models/category';
import { Pagination } from '../../../../../components/ui';
import CategoryFilter from './components/CategoryFilter/CategoryFilter';
import CategoryTable from './components/CategoryTable/CategoryTable';

type Props = {
  rows: Category[];
  cols: string[];
};

const CategoryList = ({ rows, cols }: Props) => {
  return (
    <div className="space-y-4 rounded-md">
      <CategoryFilter />
      <CategoryTable cols={cols} rows={rows} />
      <Pagination />
    </div>
  );
};

const Td = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <td className={classNames('py-3 pr-6 text-left font-medium', className)}>
    {children}
  </td>
);

export default CategoryList;
