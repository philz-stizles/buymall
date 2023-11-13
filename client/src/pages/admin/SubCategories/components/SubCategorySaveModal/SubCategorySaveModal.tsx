import { AnimatePresence } from 'framer-motion';
import { Modal } from '../../../../../components/ui';
import SubCategoryForm from '../SubCategoryForm/SubCategoryForm';
import { useLocalQuery } from '../../../../../hooks';
import { SubCategory } from '../../../../../models/sub-category';

type Props = {
  selectedSubCategory: SubCategory | null;
  isOpen?: boolean;
  readonly?: boolean;
  onClose: () => void;
  onReload?: (endpoint: string) => void;
};

const SubCategorySaveModal = ({
  selectedSubCategory,
  isOpen,
  readonly,
  onClose,
  onReload,
}: Props) => {
  const { data, isLoading } = useLocalQuery<SubCategory | null>(
    selectedSubCategory ? `/sub-categories/${selectedSubCategory?.id}` : null,
    null
  );


  console.log('selected', selectedSubCategory?.id, data);
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          title={data ? 'Edit SubCategory' : 'New SubCategory'}
          subTitle="Make changes to your profile here. Click save when you're done."
          onClose={onClose}
        >
          {selectedSubCategory && isLoading ? (
            <p>Loading....</p>
          ) : (
            <SubCategoryForm
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

export default SubCategorySaveModal;
