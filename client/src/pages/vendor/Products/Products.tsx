import { useCallback, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import {
  Button,
  DashboardHeading,
  Divider,
  PageLoader,
  TableFilter,
} from '../../../components/ui';
import { Product } from '../../../models/product';
import ProductSaveModal from './components/ProductSaveModal/ProductSaveModal';
import { useLocalQuery } from '../../../hooks';
import { AnimatePresence } from 'framer-motion';
import ProductDeleteModal from './components/ProductDeleteModal/ProductDeleteModal';
import { ApiList } from '../../../components/vendor/ApiList/ApiList';
import { Paged } from '../../../types';
import ProductList from './components/ProductList/ProductList';

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [view, setView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    null
  );
 const {
   data: pagedProducts,
   isLoading,
   error,
   reload,
 } = useLocalQuery<Product[]>('/products', []);

  const handleDelete = useCallback(async (product: Product) => {
    setSelectedProduct(product);
    setConfirmDelete(true);
  }, []);

  const handleEdit = useCallback(async (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  }, []);

  const handleView = useCallback(async (product: Product) => {
    setSelectedProduct(product);
    setView(true);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(async () => {
    if (selectedProduct) {
      setSelectedProduct(null);
    }

    if (view) {
      setView(false);
    }

    setShowModal(false);
  }, [selectedProduct, view]);

  const handleCloseAlert = useCallback(async () => {
    if (selectedProduct) {
      setSelectedProduct(null);
    }

    setConfirmDelete(false);
  }, [selectedProduct]);

  return (
    <div className="flex-1 flex flex-col gap-6 py-8 pt-4">
      <div className="flex items-center justify-between">
        <DashboardHeading
          title={`Products (${pagedProducts.length})`}
          description="Here a list of your tasks for this month!"
        />

        <Button
          label="Add New"
          iconLeft={IoAdd}
          onClick={() => setShowModal(true)}
        />
      </div>

      {isLoading && <PageLoader />}

      {!isLoading && !error && (
        <ProductList
          products={pagedProducts}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onView={handleView}
        />
      )}

      <Divider />

      <ApiList entityName="products" entityIdName="productId" />

      {showModal && (
        <ProductSaveModal
          readonly={view}
          selectedProduct={selectedProduct}
          isOpen={showModal}
          onClose={handleCloseModal}
          onReload={reload}
        />
      )}

      <AnimatePresence>
        {confirmDelete && selectedProduct && (
          <ProductDeleteModal
            selected={selectedProduct}
            onClose={handleCloseAlert}
            onReload={reload}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
