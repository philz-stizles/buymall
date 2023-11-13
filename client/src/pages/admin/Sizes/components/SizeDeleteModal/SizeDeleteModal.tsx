import { useCallback } from 'react';
import { Alert } from '../../../../../components/ui';
import { useLocalMutation } from '../../../../../hooks';
import { Size } from '../../../../../models/size';

type Props = {
  selected: Size;
  onClose: () => void;
  onReload?: (endpoint: string) => void;
};

const SizeDeleteModal = ({ selected, onClose, onReload }: Props) => {
  const { isLoading, mutate } = useLocalMutation(
    `/sizes/${selected.id}`,
    {
      options: {
        method: 'DELETE',
      },
      onSuccess: () => {
        onReload && onReload('/sizes');
        onClose();
      },
    }
  );

  const handleDelete = useCallback(async () => {
    mutate();
    // toast.success('A new product was created successful');
  }, [mutate]);

  return (
    <Alert
      title="Delete size"
      description={`the ${selected.name} size`}
      onClose={onClose}
      onSubmit={handleDelete}
      isLoading={isLoading}
    />
  );
};

export default SizeDeleteModal;
