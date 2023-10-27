import { Coupon } from "../../../models/coupon"

type CouponItemProps = {
    item: Coupon
}

const CouponItem = ({ item }: CouponItemProps) => {
  return (
    <div className="flex">
      <div>{item.name}</div>
      <div>{item.description}</div>
      <div>{item.code}</div>
    </div>
  );
}

export default CouponItem