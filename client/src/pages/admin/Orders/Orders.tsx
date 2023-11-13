import { useCallback, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import {
  Button,
  DashboardHeading,
  Divider,
  PageLoader,
  TableFilter,
} from '../../../components/ui';
import { Order } from '../../../models/order';
import OrderDetailsModal from './components/OrderDetailsModal/OrderDetailsModal';
import OrderTable from './components/OrderTable/OrderTable';
import { useLocalQuery } from '../../../hooks';
import { AnimatePresence } from 'framer-motion';
import { ApiList } from '../../../components/vendor/ApiList/ApiList';

const Orders = () => {
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { data, isLoading, error, reload } = useLocalQuery<{
    count: number;
    orders: Order[];
  }>('/orders', { count: 0, orders: [] });

  const handleView = useCallback(async (order: Order) => {
    setSelectedOrder(order);
    setView(true);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(async () => {
    if (selectedOrder) {
      setSelectedOrder(null);
    }

    if (view) {
      setView(false);
    }

    setShowModal(false);
  }, [selectedOrder, view]);

  return (
    <div className="flex-1 flex flex-col gap-6 py-8 pt-4">
      <div className="flex items-center justify-between">
        <DashboardHeading
          title={`Orders (${data.count})`}
          description="Here a list of your tasks for this month!"
        />

        <Button
          label="Add New"
          iconLeft={IoAdd}
          onClick={() => setShowModal(true)}
        />
      </div>

      <TableFilter
        onFilter={useCallback(
          async (searchValue: string) => {
            await reload(`/orders?search=${searchValue}`);
          },
          [reload]
        )}
      />

      {isLoading && <PageLoader />}

      {!isLoading && !error && (
        <OrderTable orders={data.orders} onView={handleView} />
      )}

      <Divider />

      <ApiList entityName="orders" entityIdName="orderId" />

      {showModal && (
        <OrderDetailsModal
          readonly={view}
          selectedOrder={selectedOrder}
          isOpen={showModal}
          onClose={handleCloseModal}
          onReload={reload}
        />
      )}
    </div>
  );
};

export default Orders;
