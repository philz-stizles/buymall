import { useCallback, useState } from 'react';
import { Button, Input } from '../../../../../components/ui';
import { toast } from 'sonner';
import { useLocalMutation } from '../../../../../hooks';

type Props = {};

const ApplyCoupon = (props: Props) => {
  const [coupon, setCoupon] = useState('');
  const { isLoading, error, mutate } = useLocalMutation('/users/address', {
    onSuccess: (data) => {
      console.log('RES ON COUPON APPLIED', data);
      // setAddressSaved(true);
      toast.success('Address saved');
    },
  });

  const handleApplyCoupon = useCallback(() => {
    mutate({ coupon });
    // applyCoupon(coupon, user.token).then((res) => {
    //   console.log('RES ON COUPON APPLIED', res.data);
    //   if (res.data) {
    //     setTotalAfterDiscount(res.data);
    //     // update redux coupon applied true
    //     dispatch({ type: TOGGLE_COUPON_APPLY, payload: true });
    //   }
    //   // error
    //   if (res.data.err) {
    //     setDiscountError(res.data.err);
    //     // update redux coupon applied false
    //     dispatch({ type: TOGGLE_COUPON_APPLY, payload: false });
    //   }
    // });
  }, [coupon, mutate]);

  return (
    <section>
      <Input
        label="Got Coupon?"
        onChange={(e) => {
          setCoupon(e.target.value);
        }}
        value={coupon}
        className='mb-4'
      />
      <Button label="Apply" onClick={handleApplyCoupon} loading={isLoading} />
    </section>
  );
};

export default ApplyCoupon;
