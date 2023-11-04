import { Fragment, useState } from 'react';
import { MdAdd, MdDownload } from 'react-icons/md';
import { Button } from '../../../components/ui';
import { Product } from '../../../models/product';
import ProductCreateModal from './components/ProductCreateModal/ProductCreateModal';
import useLocalQuery from '../../../hooks/use-local-query';
import Loader from '../../../components/ui/Loader/Loader';
import { baseUrl } from '../../../utils/constants';

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: products,
    isLoading,
    error,
    reload,
  } = useLocalQuery<Product[]>(`${baseUrl}/products`, []);

  return (
    <Fragment>
      <div className="flex items-center justify-between space-y-2 py-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Product</h2>
          <p className="text-muted-foreground">
            Here's a list of your tasks for this month!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button label="Export CSV" iconRight={MdDownload} />
          <Button label="Export PDF" iconRight={MdDownload} />
          <Button
            label="Create"
            iconRight={MdAdd}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}

      {!isLoading && !error && <p></p>}

      <ProductCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReload={reload}
      />
    </Fragment>
  );
};

export default Products;
