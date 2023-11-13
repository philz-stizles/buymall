import { useCallback, useState } from 'react';
import {
  DashboardHeading,
  PageLoader,
  TableFilter,
} from '../../../components/ui';
import { Category } from '../../../models/category';

import { useLocalQuery } from '../../../hooks';

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const { data, isLoading, error, reload } = useLocalQuery<{
    count: number;
    categories: Category[];
  }>('/categories', { count: 0, categories: [] });

  const handleCloseModal = useCallback(async () => {
    if (selectedCategory) {
      setSelectedCategory(null);
    }

    if (view) {
      setView(false);
    }

    setShowModal(false);
  }, [selectedCategory, view]);

  return (
    <div className="flex-1 flex flex-col gap-6 py-8 pt-4">
      <div className="flex items-center justify-between">
        <DashboardHeading
          title={`Categories (${data.count})`}
          description="Here a list of your tasks for this month!"
        />
      </div>

      <TableFilter
        onFilter={useCallback(
          async (searchValue: string) => {
            await reload(`/categories?search=${searchValue}`);
          },
          [reload]
        )}
      />

      {isLoading && <PageLoader />}

      {!isLoading && !error && <p>lIST</p>}

      {showModal && <p></p>}
    </div>
  );
};

export default Categories;
