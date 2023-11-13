import { Fragment, useCallback, useState } from 'react';
import { MdDownload } from 'react-icons/md';
import { IoAdd } from 'react-icons/io5';
import { Alert, Button } from '../../../components/ui';
import Loader from '../../../components/ui/Loader/Loader';
import { Coupon } from '../../../models/coupon';
import CouponCreateModal from './components/CouponSaveModal/CouponSaveModal';
import CouponTable from './components/CouponTable/CouponTable';
import { useLocalQuery } from '../../../hooks';

const Coupons = () => {
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [view, setView] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const {
    data: coupons,
    isLoading,
    error,
    reload,
  } = useLocalQuery<Coupon[]>('/coupons', []);

  const handleDelete = useCallback(async () => {}, []);

  const handleEdit = useCallback(async (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setShowModal(true);
  }, []);

  const handleView = useCallback(async (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setView(true);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(async () => {
    if (selectedCoupon) {
      setSelectedCoupon(null);
    }

    if (view) {
      setView(false);
    }

    setShowModal(false);
  }, [selectedCoupon, view]);

  return (
    <Fragment>
      <div className="flex items-center justify-between space-y-2 py-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2 text-slate-700">
            Coupons
          </h2>
          <p className="text-muted-foreground">
            Here's a list of your tasks for this month!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" label="Export CSV" iconRight={MdDownload} />
          <Button label="Export PDF" iconRight={MdDownload} />
          <Button
            label="Create coupon"
            iconLeft={IoAdd}
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}

      {!isLoading && !error && (
        <CouponTable
          coupons={coupons}
          onDelete={() => setConfirmDelete(true)}
          onEdit={handleEdit}
          onView={handleView}
        />
      )}

      {showModal && (
        <CouponCreateModal
          readonly={view}
          selectedCoupon={selectedCoupon}
          isOpen={showModal}
          onClose={handleCloseModal}
          onReload={reload}
        />
      )}

      {confirmDelete && (
        <Alert
          title="Are you absolutely sure?"
          description={`This action cannot be undone. This will permanently delete the category.`}
          onClose={() => setConfirmDelete(false)}
          onSubmit={handleDelete}
        />
      )}
    </Fragment>
  );
};

export default Coupons;
