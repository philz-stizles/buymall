import { AnimatePresence } from 'framer-motion';
import { Modal } from '../../../../../components/ui';
import CouponForm from '../CouponForm/CouponForm';

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onReload?: () => void;
};

const CouponCreateModal = ({ isOpen, onClose, onReload }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          title="New Coupon"
          subTitle="Make changes to your profile here. Click save when you're done."
          onClose={onClose}
        >
          <CouponForm onClose={onClose} onReload={onReload} />
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default CouponCreateModal;
