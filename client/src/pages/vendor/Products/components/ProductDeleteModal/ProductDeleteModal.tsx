import { useCallback } from 'react';
import { Alert } from '../../../../../components/ui';
import { useLocalMutation } from '../../../../../hooks';
import { Product } from '../../../../../models/product';

type Props = {
  selected: Product;
  onClose: () => void;
  onReload?: (endpoint: string) => void;
};

const ProductDeleteModal = ({ selected, onClose, onReload }: Props) => {
  const { isLoading, mutate } = useLocalMutation(
    `/products/${selected.id}`,
    {
      options: {
        method: 'DELETE',
      },
      onSuccess: () => {
        onReload && onReload('/products');
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
      title="Delete product"
      description={`the ${selected.title} product`}
      onClose={onClose}
      onSubmit={handleDelete}
      isLoading={isLoading}
    />
  );
};

export default ProductDeleteModal;
