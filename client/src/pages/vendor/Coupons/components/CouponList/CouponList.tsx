import { IoSearch } from 'react-icons/io5';
import { Fragment } from 'react';
import CouponItem from '../CouponItem/CouponItem';
import { EmptyState, Pagination } from '../../../../../components/ui';
import { Coupon } from '../../../../../models/coupon';
import CouponFilter from '../CouponFilter/CouponFilter';
import { Checkbox } from '../../../../../components/form';
import { BsSortAlphaDown } from 'react-icons/bs';
import classNames from 'classnames';

type Props = {
  coupons: Coupon[];
};

const CouponList = ({ coupons }: Props) => {
  return (
    <div className="space-y-4">
      <CouponFilter />
      {coupons && coupons.length <= 0 ? (
        <EmptyState
          icon={IoSearch}
          title="No results found"
          description="There aren't any results for that query."
        />
      ) : (
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            {/* <tr className="bg-slate-100 px-6 p-4 text-slate-500 font-semibold rounded-t-lg"> */}
            <tr className="bg-slate-100 border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted border-slate-300 rounded-t-lg">
              <Th>
                <Checkbox />
              </Th>
              <Th>
                <div className="inline-flex items-center gap-2">
                  Code <BsSortAlphaDown size={18} />
                </div>
              </Th>
              <Th>Description</Th>
              <Th>
                <div className="inline-flex items-center gap-2">% Discount</div>
              </Th>
              <Th>Expiry</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {coupons &&
              coupons.map((item) => <CouponItem key={item.id} item={item} />)}
          </tbody>
        </table>
      )}
      <Pagination />
    </div>
  );
};

const Th = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <td
    className={classNames(
      'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
  >
    {children}
  </td>
);

export default CouponList;
