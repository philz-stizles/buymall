import { useLoaderData } from 'react-router-dom'
import CouponItem from './CouponItem'
import { EmptyState } from '../../../components/ui';
import { Coupon } from '../../../models/coupon';
import { MdCloud, MdOutlineCloud } from 'react-icons/md';

const CouponList = () => {
  const coupons = useLoaderData() as Coupon[]

  return (
    <>
      {coupons && coupons.length <= 0 && (
        <EmptyState icon={MdOutlineCloud} title="No coupons" description="" />
      )}
      {coupons && coupons.length > 0 && (
        <ul>
          {coupons &&
            coupons.map((item) => <CouponItem key={item.id} item={item} />)}
        </ul>
      )}
    </>
  );
}

export default CouponList