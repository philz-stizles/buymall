import { AnimatePresence } from 'framer-motion';
import { Modal } from '../../../../../components/ui';
import CategoryForm from '../CategoryForm/CategoryForm';

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onReload?: () => void;
};

const CategoryCreateModal = ({ isOpen, onClose, onReload }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          title="New Category"
          subTitle="Create a new product category here. Click save when you're done."
          onClose={onClose}
        >
          <CategoryForm onClose={onClose} onReload={onReload} />
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default CategoryCreateModal;
