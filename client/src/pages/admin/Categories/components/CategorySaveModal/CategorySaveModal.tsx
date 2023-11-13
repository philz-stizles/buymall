import { AnimatePresence } from 'framer-motion';
import { Modal } from '../../../../../components/ui';
import CategoryForm from '../CategoryForm/CategoryForm';
import { useLocalQuery } from '../../../../../hooks';
import { Category } from '../../../../../models/category';

type Props = {
  selectedCategory: Category | null;
  isOpen?: boolean;
  readonly?: boolean;
  onClose: () => void;
  onReload?: (endpoint: string) => void;
};

const CategorySaveModal = ({
  selectedCategory,
  isOpen,
  readonly,
  onClose,
  onReload,
}: Props) => {
  const { data, isLoading } = useLocalQuery<Category | null>(
    selectedCategory ? `/categories/${selectedCategory?.id}` : null,
    null
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          title={data ? 'Edit Category' : 'New Category'}
          subTitle="Make changes to your profile here. Click save when you're done."
          onClose={onClose}
        >
          {selectedCategory && isLoading ? (
            <p>Loading....</p>
          ) : (
            <CategoryForm
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

export default CategorySaveModal;
