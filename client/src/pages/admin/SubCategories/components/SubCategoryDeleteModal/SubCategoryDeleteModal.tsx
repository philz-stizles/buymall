import { useCallback } from 'react';
import { Alert } from '../../../../../components/ui';
import { useLocalMutation } from '../../../../../hooks';
import { SubCategory } from '../../../../../models/sub-category';

type Props = {
  selected: SubCategory;
  onClose: () => void;
  onReload?: (endpoint: string) => void;
};

const SubCategoryDeleteModal = ({ selected, onClose, onReload }: Props) => {
  const { isLoading, mutate } = useLocalMutation(
    `/subSubCategories/${selected.id}`,
    {
      options: {
        method: 'DELETE',
      },
      onSuccess: () => {
        onReload && onReload('/subSubCategories');
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
      title="Delete subCategory"
      description={`the ${selected.name} subCategory`}
      onClose={onClose}
      onSubmit={handleDelete}
      isLoading={isLoading}
    />
  );
};

export default SubCategoryDeleteModal;
