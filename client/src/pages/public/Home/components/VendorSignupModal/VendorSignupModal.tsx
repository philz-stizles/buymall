import { AnimatePresence } from 'framer-motion';
import { Modal } from '../../../../../components/ui';
import SignupForm from '../SignupForm/SignupForm';

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onReload?: () => void;
};

const VendorSignupModal = ({ isOpen, onClose, onReload }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          title="Become a Vendor"
          subTitle="Complete our vendor registration form now to connect with a diverse community of shoppers. "
          onClose={onClose}
        >
          <SignupForm onClose={onClose} onReload={onReload} />
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default VendorSignupModal;
