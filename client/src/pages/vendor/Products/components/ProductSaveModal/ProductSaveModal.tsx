import { AnimatePresence } from 'framer-motion';
import { Modal } from '../../../../../components/ui';
import ProductForm from '../ProductForm/ProductForm';
import { Product } from '../../../../../models/product';

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onReload?: () => void;
  readonly: boolean;
  selectedProduct: Product | null;
};

const ProductSaveModal = ({ isOpen, onClose, onReload }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          title="New Product"
          subTitle="Make changes to your profile here. Click save when you're done."
          onClose={onClose}
        >
          <ProductForm onClose={onClose} onReload={onReload} />
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default ProductSaveModal;
