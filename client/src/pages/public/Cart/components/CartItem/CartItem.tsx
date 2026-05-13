import { IoCloseOutline } from 'react-icons/io5';
import { Currency, IconButton } from '../../../../../components/ui';
import { useCart } from '../../../../../context';

type Props = {
  data: any;
};

const CartItem = ({ data }: Props) => {
  const { removeItem: removeItemFromCart } = useCart();

  const handleRemoveItem = () => {
    removeItemFromCart(data.id);
  };

  return (
    <li className="flex py-6 border-b gap-6">
      <figure className="relative h-16 w-16 rounded-md overflow-hidden sm:h-24 sm:w-24">
        <img
          src={data.images[0].url}
          alt=""
          className="w-full object-cover object-center"
        />
      </figure>

      <div className="relative flex flex-1 flex-col justify-between">
        <div className="absolute z-10 right-0 top-0">
          <IconButton
            variant="white"
            rounded
            onClick={handleRemoveItem}
            icon={IoCloseOutline}
          />
        </div>
        <div className="">
          <div className="flex justify-between">
            <p className="font-semibold text-black">
              {data.title} x {data.quantity} ={' '}
              {(data.price * data.quantity).toFixed(2)}
            </p>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.color?.name} </p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
              {data.size?.name}
            </p>
          </div>
          <Currency value={data.price} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
