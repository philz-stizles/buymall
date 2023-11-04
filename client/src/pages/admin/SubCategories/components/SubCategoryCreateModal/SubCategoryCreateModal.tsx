import { AnimatePresence } from 'framer-motion';
import { Modal } from '../../../../../components/ui';
import SubCategoryForm from '../SubCategoryForm/SubCategoryForm';

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onReload?: () => void;
};

const SubCategoryCreateModal = ({ isOpen, onClose, onReload }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal title="New Sub Category" onClose={onClose}>
          <SubCategoryForm onClose={onClose} onReload={onReload} />
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default SubCategoryCreateModal;
