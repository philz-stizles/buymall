import { AnimatePresence } from 'framer-motion';
import { Modal } from '../../../../../components/ui';
import ColorForm from '../ColorForm/ColorForm';
import { useLocalQuery } from '../../../../../hooks';
import { Color } from '../../../../../models/color';

type Props = {
  selectedColor: Color | null;
  isOpen?: boolean;
  readonly?: boolean;
  onClose: () => void;
  onReload?: (endpoint: string) => void;
};

const ColorSaveModal = ({
  selectedColor,
  isOpen,
  readonly,
  onClose,
  onReload,
}: Props) => {
  const { data, isLoading } = useLocalQuery<Color | null>(
    selectedColor ? `/Colors/${selectedColor?.id}` : null,
    null
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          title={data ? 'Edit Color' : 'New Color'}
          subTitle="Make changes to your profile here. Click save when you're done."
          onClose={onClose}
        >
          {selectedColor && isLoading ? (
            <p>Loading....</p>
          ) : (
            <ColorForm
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

export default ColorSaveModal;
