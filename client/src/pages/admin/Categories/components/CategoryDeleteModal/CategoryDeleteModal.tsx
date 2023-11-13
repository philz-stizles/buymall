import { useCallback } from 'react';
import { Alert } from '../../../../../components/ui';
import { useLocalMutation } from '../../../../../hooks';
import { Category } from '../../../../../models/category';

type Props = {
  selected: Category;
  onClose: () => void;
  onReload?: (endpoint: string) => void;
};

const CategoryDeleteModal = ({ selected, onClose, onReload }: Props) => {
  const { isLoading, mutate } = useLocalMutation(
    `/categories/${selected.id}`,
    {
      options: {
        method: 'DELETE',
      },
      onSuccess: () => {
        onReload && onReload('/categories');
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
      title="Delete category"
      description={`the ${selected.name} category`}
      onClose={onClose}
      onSubmit={handleDelete}
      isLoading={isLoading}
    />
  );
};

export default CategoryDeleteModal;
