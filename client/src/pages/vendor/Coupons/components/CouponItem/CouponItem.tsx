import moment from 'moment';
import { Coupon } from '../../../../../models/coupon';
import { IoTrash, IoTrashOutline } from 'react-icons/io5';
import { MdDeleteForever, MdModeEditOutline } from 'react-icons/md';
import { Checkbox } from '../../../../../components/form';
import classNames from 'classnames';

type Props = {
  item: Coupon;
};

const CouponItem = ({ item }: Props) => {
  return (
    // bg-white px-6 p-4 rounded-lg text-slate-600
    // border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted
    <tr className="rounded-lg border-b border-slate-200 transition-colors bg-white hover:bg-muted/50 data-[state=selected]:bg-muted text-slate-600">
      <Td>
        <Checkbox />
      </Td>
      <Td>{item.name}</Td>
      <Td>{item.description}</Td>
      <Td>{item.discount}</Td>
      <Td>{moment(item.expiry).format('L')}</Td>
      <Td>
        <div className="inline-flex items-center gap-2">
          <IoTrashOutline size={18} />
          <MdModeEditOutline size={18} />
        </div>
      </Td>
    </tr>
  );
};

const Td = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <td
    className={classNames(
      'p-2  align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
  >
    {children}
  </td>
);

export default CouponItem;
