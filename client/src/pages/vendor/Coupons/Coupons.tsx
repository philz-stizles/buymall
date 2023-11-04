import { Fragment, useState } from 'react';
import { MdDownload } from 'react-icons/md';
import { Button } from '../../../components/ui';
import Loader from '../../../components/ui/Loader/Loader';
import { baseUrl } from '../../../utils/constants';
import { Coupon } from '../../../models/coupon';
import CouponCreateModal from './components/CouponCreateModal/CouponCreateModal';
import CouponList from './components/CouponList/CouponList';
import { useLocalQuery } from '../../../hooks';
import { IoAdd } from 'react-icons/io5';

const Coupons = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    data: coupons,
    isLoading,
    error,
    reload,
  } = useLocalQuery<Coupon[]>(`${baseUrl}/coupons`, []);
  return (
    <Fragment>
      <div className="flex items-center justify-between space-y-2 py-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2 text-slate-700">Coupons</h2>
          <p className="text-muted-foreground">
            Here's a list of your tasks for this month!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button size='sm' label="Export CSV" iconRight={MdDownload} />
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

      {!isLoading && !error && <CouponList coupons={coupons} />}

      <CouponCreateModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onReload={reload}
      />
    </Fragment>
  );
};

export default Coupons;
