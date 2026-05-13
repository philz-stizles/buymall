import { TbShoppingCart } from 'react-icons/tb';
import { Button, Currency } from '../../../../../components/ui';
import { Product } from '../../../../../models/product';

type Props = {
  product: Product;
  onStarClick: (newRating: number, name: string[]) => void;
  star: number;
};

const SingleProduct = ({ product, onStarClick }: Props) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-gray-900">
          <Currency value={product?.price} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>34</div>
          {/* <div>{product?.size?.value}</div> */}
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{
              backgroundColor: 'blue', //product?.color?.value
            }}
          />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button
          label="Add To Cart"
          iconLeft={TbShoppingCart}
          // onClick={onAddToCart}
          className="flex items-center gap-x-2"
        ></Button>
      </div>
    </div>
  );
};

export default SingleProduct;
