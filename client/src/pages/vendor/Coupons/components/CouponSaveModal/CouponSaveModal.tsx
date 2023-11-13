import { AnimatePresence } from 'framer-motion';
import { Modal } from '../../../../../components/ui';
import CouponForm from '../CouponForm/CouponForm';
import { useLocalQuery } from '../../../../../hooks';
import { Coupon } from '../../../../../models/coupon';

type Props = {
  selectedCoupon: Coupon | null;
  isOpen?: boolean;
  readonly?: boolean;
  onClose: () => void;
  onReload?: (endpoint: string) => void;
};

const CouponSaveModal = ({
  selectedCoupon,
  isOpen,
  readonly,
  onClose,
  onReload,
}: Props) => {
  const { data, isLoading } = useLocalQuery<Coupon | null>(
    selectedCoupon ? `/coupons/${selectedCoupon?.id}` : null,
    null
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          title={data ? 'Edit Coupon' : 'New Coupon'}
          subTitle="Make changes to your profile here. Click save when you're done."
          onClose={onClose}
        >
          {selectedCoupon && isLoading ? (
            <p>Loading....</p>
          ) : (
            <CouponForm
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

export default CouponSaveModal;
