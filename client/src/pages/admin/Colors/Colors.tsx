import { useCallback, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import {
  Button,
  DashboardHeading,
  Divider,
  PageLoader,
  TableFilter,
} from '../../../components/ui';
import { Color } from '../../../models/color';
import ColorCreateModal from './components/ColorSaveModal/ColorSaveModal';
import ColorTable from './components/ColorTable/ColorTable';
import { useLocalQuery } from '../../../hooks';
import { AnimatePresence } from 'framer-motion';
import ColorDeleteModal from './components/ColorDeleteModal/ColorDeleteModal';
import { ApiList } from '../../../components/vendor/ApiList/ApiList';
import { Paged } from '../../../types';

const Colors = () => {
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [view, setView] = useState(false);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const { data: pagedColors, isLoading, error, reload } = useLocalQuery<Paged<Color>>('/colors', { count: 0, data: [] });

  const handleDelete = useCallback(async (color: Color) => {
    setSelectedColor(color);
    setConfirmDelete(true);
  }, []);

  const handleEdit = useCallback(async (color: Color) => {
    setSelectedColor(color);
    setShowModal(true);
  }, []);

  const handleView = useCallback(async (color: Color) => {
    setSelectedColor(color);
    setView(true);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(async () => {
    if (selectedColor) {
      setSelectedColor(null);
    }

    if (view) {
      setView(false);
    }

    setShowModal(false);
  }, [selectedColor, view]);

  const handleCloseAlert = useCallback(async () => {
    if (selectedColor) {
      setSelectedColor(null);
    }

    setConfirmDelete(false);
  }, [selectedColor]);

  return (
    <div className="flex-1 flex flex-col gap-6 py-8 pt-4">
      <div className="flex items-center justify-between">
        <DashboardHeading
          title={`Colors (${pagedColors.count})`}
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
            await reload(`/colors?search=${searchValue}`);
          },
          [reload]
        )}
      />

      {isLoading && <PageLoader />}

      {!isLoading && !error && (
        <ColorTable
          colors={pagedColors.data}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onView={handleView}
        />
      )}

      <Divider />

      <ApiList entityName="colors" entityIdName="colorId" />

      {showModal && (
        <ColorCreateModal
          readonly={view}
          selectedColor={selectedColor}
          isOpen={showModal}
          onClose={handleCloseModal}
          onReload={reload}
        />
      )}

      <AnimatePresence>
        {confirmDelete && selectedColor && (
          <ColorDeleteModal
            selected={selectedColor}
            onClose={handleCloseAlert}
            onReload={reload}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Colors;
