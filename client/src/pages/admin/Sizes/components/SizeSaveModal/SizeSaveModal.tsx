import { AnimatePresence } from 'framer-motion';
import { Modal } from '../../../../../components/ui';
import SizeForm from '../SizeForm/SizeForm';
import { useLocalQuery } from '../../../../../hooks';
import { Size } from '../../../../../models/size';

type Props = {
  selectedSize: Size | null;
  isOpen?: boolean;
  readonly?: boolean;
  onClose: () => void;
  onReload?: (endpoint: string) => void;
};

const SizeSaveModal = ({
  selectedSize,
  isOpen,
  readonly,
  onClose,
  onReload,
}: Props) => {
  const { data, isLoading } = useLocalQuery<Size | null>(
    selectedSize ? `/sizes/${selectedSize?.id}` : null,
    null
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          title={data ? 'Edit Size' : 'New Size'}
          subTitle="Make changes to your profile here. Click save when you're done."
          onClose={onClose}
        >
          {selectedSize && isLoading ? (
            <p>Loading....</p>
          ) : (
            <SizeForm
              readonly={readonly}
              data={data}
              onClose={onClose}
              onReload={onReload}
            />
          )}
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default SizeSaveModal;
