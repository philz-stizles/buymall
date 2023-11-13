import { useCallback, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import {
  Button,
  DashboardHeading,
  Divider,
  PageLoader,
  TableFilter,
} from '../../../components/ui';
import { SubCategory } from '../../../models/sub-category';
import SubCategoryCreateModal from './components/SubCategorySaveModal/SubCategorySaveModal';
import SubCategoryTable from './components/SubCategoryTable/SubCategoryTable';
import { useLocalQuery } from '../../../hooks';
import { AnimatePresence } from 'framer-motion';
import SubCategoryDeleteModal from './components/SubCategoryDeleteModal/SubCategoryDeleteModal';
import { ApiList } from '../../../components/vendor/ApiList/ApiList';
import { Paged } from '../../../types';

const SubCategories = () => {
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [view, setView] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const {
    data: pagedSubCategories,
    isLoading,
    error,
    reload,
  } = useLocalQuery<Paged<SubCategory>>('/sub-categories', {
    count: 0,
    data: [],
  });

  const handleDelete = useCallback(async (subSubCategory: SubCategory) => {
    setSelectedSubCategory(subSubCategory);
    setConfirmDelete(true);
  }, []);

  const handleEdit = useCallback(async (subSubCategory: SubCategory) => {
    setSelectedSubCategory(subSubCategory);
    setShowModal(true);
  }, []);

  const handleView = useCallback(async (subSubCategory: SubCategory) => {
    setSelectedSubCategory(subSubCategory);
    setView(true);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(async () => {
    if (selectedSubCategory) {
      setSelectedSubCategory(null);
    }

    if (view) {
      setView(false);
    }

    setShowModal(false);
  }, [selectedSubCategory, view]);

  const handleCloseAlert = useCallback(async () => {
    if (selectedSubCategory) {
      setSelectedSubCategory(null);
    }

    setConfirmDelete(false);
  }, [selectedSubCategory]);

  return (
    <div className="flex-1 flex flex-col gap-6 py-8 pt-4">
      <div className="flex items-center justify-between">
        <DashboardHeading
          title={`SubCategories (${pagedSubCategories.count})`}
          description="Here a list of your tasks for this month!"
        />

        <Button
          label="Add New"
          iconLeft={IoAdd}
          onClick={() => setShowModal(true)}
        />
      </div>

      <TableFilter
        onFilter={useCallback(
          async (searchValue: string) => {
            await reload(`/sub-categories?search=${searchValue}`);
          },
          [reload]
        )}
      />

      {isLoading && <PageLoader />}

      {!isLoading && !error && (
        <SubCategoryTable
          data={pagedSubCategories.data}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onView={handleView}
        />
      )}

      <Divider />

      <ApiList entityName="subCategories" entityIdName="subSubCategoryId" />

      {showModal && (
        <SubCategoryCreateModal
          readonly={view}
          selectedSubCategory={selectedSubCategory}
          isOpen={showModal}
          onClose={handleCloseModal}
          onReload={reload}
        />
      )}

      <AnimatePresence>
        {confirmDelete && selectedSubCategory && (
          <SubCategoryDeleteModal
            selected={selectedSubCategory}
            onClose={handleCloseAlert}
            onReload={reload}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubCategories;
