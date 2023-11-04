import { Fragment, useState } from 'react';
import { Button } from '../../../components/ui';
import { MdAdd, MdDownload } from 'react-icons/md';
import useLocalQuery from '../../../hooks/use-local-query';
import { SubCategory } from '../../../models/sub-category';
import { baseUrl } from '../../../utils/api';
import SubCategoryCreateModal from './components/SubCategoryCreateModal/SubCategoryCreateModal';
import Loader from '../../../components/ui/Loader/Loader';
import SubCategoryList from './components/SubCategoryList/SubCategoryList';

const SubCategories = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    data: subCategories,
    isLoading,
    error,
    reload,
  } = useLocalQuery<SubCategory[]>(`${baseUrl}/sub-categories`, []);

  console.log('subCategories', subCategories)

  return (
    <Fragment>
      <div className="flex items-center justify-between space-y-2 py-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Sub Categories</h2>
          <p className="text-muted-foreground">
            Here's a list of your sub categories for this month!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button label="Export CSV" iconRight={MdDownload} />
          <Button label="Export PDF" iconRight={MdDownload} />
          <Button
            label="Create"
            iconRight={MdAdd}
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}

      {!isLoading && !error && (
        <SubCategoryList
          cols={[
            '#',
            'Name',
            'Description',
            'Date Created',
            'Status',
            'Action',
          ]}
          rows={subCategories}
        />
      )}

      <SubCategoryCreateModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onReload={reload}
      />
    </Fragment>
  );
};

export default SubCategories;
