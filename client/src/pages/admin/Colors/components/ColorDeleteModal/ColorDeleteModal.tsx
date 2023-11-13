import { useCallback } from 'react';
import { Alert } from '../../../../../components/ui';
import { useLocalMutation } from '../../../../../hooks';
import { Color } from '../../../../../models/color';

type Props = {
  selected: Color;
  onClose: () => void;
  onReload?: (endpoint: string) => void;
};

const ColorDeleteModal = ({ selected, onClose, onReload }: Props) => {
  const { isLoading, mutate } = useLocalMutation(
    `/colors/${selected.id}`,
    {
      options: {
        method: 'DELETE',
      },
      onSuccess: () => {
        onReload && onReload('/colors');
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
      title="Delete color"
      description={`the ${selected.name} color`}
      onClose={onClose}
      onSubmit={handleDelete}
      isLoading={isLoading}
    />
  );
};

export default ColorDeleteModal;
