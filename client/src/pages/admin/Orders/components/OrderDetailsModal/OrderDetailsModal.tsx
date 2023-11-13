import { AnimatePresence } from 'framer-motion';
import { Modal } from '../../../../../components/ui';
import { useLocalQuery } from '../../../../../hooks';
import { Order } from '../../../../../models/order';

type Props = {
  selectedOrder: Order | null;
  isOpen?: boolean;
  readonly?: boolean;
  onClose: () => void;
  onReload?: (endpoint: string) => void;
};

const OrderDetailsModal = ({
  selectedOrder,
  isOpen,
  readonly,
  onClose,
}: Props) => {
  const { data, isLoading } = useLocalQuery<Order | null>(
    selectedOrder ? `/categories/${selectedOrder?.id}` : null,
    null
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          title={data ? 'Edit Order' : 'New Order'}
          subTitle="Make changes to your profile here. Click save when you're done."
          onClose={onClose}
        >
          {selectedOrder && isLoading ? (
            <p>Loading....</p>
          ) : (
            <p>Order Details</p>
          )}
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default OrderDetailsModal;
