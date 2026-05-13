import { Fragment, memo } from 'react';
import { Container } from '../../../components/shared';
import { AddressForm, ApplyCoupon, CartItem, Summary } from './components';
import { useCart } from '../../../context';

type Props = {};

const Cart = (props: Props) => {
  const { cart } = useCart();

  return (
    <Fragment>
      <Container>
        <div className="bg-white">
          <div className="px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-black mb-4">
              Shopping Cart
            </h1>
            {/* mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12 */}
            <div className="grid grid-cols-5 gap-8">
              <div className="col-span-3">
                {cart.items.length === 0 && (
                  <p className="text-neutral-500">No items added to cart.</p>
                )}
                <ul>
                  {cart.items.map((item) => (
                    <CartItem key={item.id} data={item} />
                  ))}
                </ul>
              </div>
              <div className="space-y-6 px-8 col-span-2">
                <AddressForm />
                <ApplyCoupon />
                <Summary />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default memo(Cart);
