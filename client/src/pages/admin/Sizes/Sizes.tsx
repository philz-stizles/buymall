import { useCallback, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import {
  Button,
  DashboardHeading,
  Divider,
  PageLoader,
  TableFilter,
} from '../../../components/ui';
import { Size } from '../../../models/size';
import SizeCreateModal from './components/SizeSaveModal/SizeSaveModal';
import SizeTable from './components/SizeTable/SizeTable';
import { useLocalQuery } from '../../../hooks';
import { AnimatePresence } from 'framer-motion';
import SizeDeleteModal from './components/SizeDeleteModal/SizeDeleteModal';
import { ApiList } from '../../../components/vendor/ApiList/ApiList';

import { Paged } from '../../../types';

const Sizes = () => {
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [view, setView] = useState(false);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const {
    data: pagedSizes,
    isLoading,
    error,
    reload,
  } = useLocalQuery<Paged<Size>>('/sizes', { count: 0, data: [] });

  const handleDelete = useCallback(async (size: Size) => {
    setSelectedSize(size);
    setConfirmDelete(true);
  }, []);

  const handleEdit = useCallback(async (size: Size) => {
    setSelectedSize(size);
    setShowModal(true);
  }, []);

  const handleView = useCallback(async (size: Size) => {
    setSelectedSize(size);
    setView(true);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(async () => {
    if (selectedSize) {
      setSelectedSize(null);
    }

    if (view) {
      setView(false);
    }

    setShowModal(false);
  }, [selectedSize, view]);

  const handleCloseAlert = useCallback(async () => {
    if (selectedSize) {
      setSelectedSize(null);
    }

    setConfirmDelete(false);
  }, [selectedSize]);

  return (
    <div className="flex-1 flex flex-col gap-6 py-8 pt-4">
      <div className="flex items-center justify-between">
        <DashboardHeading
          title={`Sizes (${pagedSizes.count})`}
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
            await reload(`/sizes?search=${searchValue}`);
          },
          [reload]
        )}
      />

      {isLoading && <PageLoader />}

      {!isLoading && !error && (
        <SizeTable
          sizes={pagedSizes.data}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onView={handleView}
        />
      )}

      <Divider />

      <ApiList entityName="sizes" entityIdName="sizeId" />

      {showModal && (
        <SizeCreateModal
          readonly={view}
          selectedSize={selectedSize}
          isOpen={showModal}
          onClose={handleCloseModal}
          onReload={reload}
        />
      )}

      <AnimatePresence>
        {confirmDelete && selectedSize && (
          <SizeDeleteModal
            selected={selectedSize}
            onClose={handleCloseAlert}
            onReload={reload}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sizes;
