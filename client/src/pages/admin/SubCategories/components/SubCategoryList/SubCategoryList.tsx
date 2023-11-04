import { Pagination } from '../../../../../components/ui';
import { SubCategory } from '../../../../../models/sub-category';
import SubCategoryFilter from './components/SubCategoryFilter/SubCategoryFilter';
import SubCategoryTable from './components/SubCategoryTable/SubCategoryTable';

type Props = {
  rows: SubCategory[];
  cols: string[];
};

const SubCategoryList = ({ rows, cols }: Props) => {
  return (
    <div className="space-y-4 rounded-md">
      <SubCategoryFilter />
      <SubCategoryTable cols={cols} rows={rows} />
      <Pagination />
    </div>
  );
};

export default SubCategoryList;
