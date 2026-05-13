import { memo, useCallback, useEffect } from 'react';
import { Button, Currency } from '../../../../../components/ui';
import { useCart } from '../../../../../context';
import { useLocalMutation } from '../../../../../hooks';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Cart } from '../../../../../models/cart';

const Summary = () => {
  const { isLoading, mutate } = useLocalMutation<
    { cart: Cart },
    { url: string }
  >('/checkout', {
    onSuccess: (data) => {
      if (data) {
        window.location.href = data.url;
      }
    },
  });
  const [searchParams] = useSearchParams();
  const { cart, clear: clearCart } = useCart();

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      clearCart();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [clearCart, searchParams]);

  const handleCheckout = useCallback(() => {
    mutate({
      cart,
    });
  }, [cart, mutate]);

  return (
    // mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-4 lg:col-span-5 lg:mt-0 lg:p-6">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={cart.totalPrice} />
        </div>
      </div>
      <Button
        loading={isLoading}
        onClick={handleCheckout}
        disabled={cart.items.length === 0}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default memo(Summary);
