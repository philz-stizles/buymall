import { useNavigate } from 'react-router-dom';
import { Product } from '../../../models/product';
import { MouseEventHandler } from 'react';
import { IoCart, IoExpand } from 'react-icons/io5';
import { Currency, IconButton, Ratings } from '../../ui';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const { id, title, price, category, images } = product;
  // const previewModal = usePreviewModal();
  // const cart = useCart();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    // previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    // cart.addItem(data);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      {/* Image & actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <img
          src={images?.[0]?.url}
          alt=""
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton onClick={onPreview}>
              <IoExpand size={20} className="text-gray-600" />
            </IconButton>
            <IconButton onClick={onAddToCart}>
              <IoCart size={20} className="text-gray-600" />
            </IconButton>
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-sm text-gray-500">{category?.name}</p>
      </div>
      {/* Price & Reiew */}
      <div className="flex items-center justify-between">
        <Currency value={price} /><Ratings ratings={[{  star: 4, postedBy: ''}]} />
      </div>
    </div>
  );
}; 

export default ProductCard;
