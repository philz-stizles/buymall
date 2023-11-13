import { useCallback, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import {
  Button,
  DashboardHeading,
  Divider,
  PageLoader,
  TableFilter,
} from '../../../components/ui';
import { Category } from '../../../models/category';
import CategoryCreateModal from './components/CategorySaveModal/CategorySaveModal';
import CategoryTable from './components/CategoryTable/CategoryTable';
import { useLocalQuery } from '../../../hooks';
import { AnimatePresence } from 'framer-motion';
import CategoryDeleteModal from './components/CategoryDeleteModal/CategoryDeleteModal';
import { ApiList } from '../../../components/vendor/ApiList/ApiList';
import { Paged } from '../../../types';

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [view, setView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const { data: pagedCategories, isLoading, error, reload } = useLocalQuery<Paged<Category>>('/categories', { count: 0, data: [] });

  const handleDelete = useCallback(async (category: Category) => {
    setSelectedCategory(category);
    setConfirmDelete(true);
  }, []);

  const handleEdit = useCallback(async (category: Category) => {
    setSelectedCategory(category);
    setShowModal(true);
  }, []);

  const handleView = useCallback(async (category: Category) => {
    setSelectedCategory(category);
    setView(true);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(async () => {
    if (selectedCategory) {
      setSelectedCategory(null);
    }

    if (view) {
      setView(false);
    }

    setShowModal(false);
  }, [selectedCategory, view]);

  const handleCloseAlert = useCallback(async () => {
    if (selectedCategory) {
      setSelectedCategory(null);
    }

    setConfirmDelete(false);
  }, [selectedCategory]);

  return (
    <div className="flex-1 flex flex-col gap-6 py-8 pt-4">
      <div className="flex items-center justify-between">
        <DashboardHeading
          title={`Categories (${pagedCategories.count})`}
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
            await reload(`/categories?search=${searchValue}`);
          },
          [reload]
        )}
      />

      {isLoading && <PageLoader />}

      {!isLoading && !error && (
        <CategoryTable
          categories={pagedCategories.data}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onView={handleView}
        />
      )}

      <Divider />

      <ApiList entityName="categories" entityIdName="categoryId" />

      {showModal && (
        <CategoryCreateModal
          readonly={view}
          selectedCategory={selectedCategory}
          isOpen={showModal}
          onClose={handleCloseModal}
          onReload={reload}
        />
      )}

      <AnimatePresence>
        {confirmDelete && selectedCategory && (
          <CategoryDeleteModal
            selected={selectedCategory}
            onClose={handleCloseAlert}
            onReload={reload}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Categories;
