import { useNavigate } from 'react-router-dom';
import { Product } from '../../../models/product';
import { MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import {
  IoCartOutline,
  IoExpandOutline,
  IoPencilOutline,
} from 'react-icons/io5';
import { Currency, IconButton, Ratings } from '../../ui';
import { useCart } from '../../../context';
import DefaultImage from './../../../assets/images/image-placeholder.png';
import { AnimatePresence } from 'framer-motion';
import PreviewModal from '../../ui/PreviewModal/PreviewModal';
import { LuPencil, LuTrash } from 'react-icons/lu';

type Mode = 'vendor' | 'admin' | 'showcase';

type Props = {
  product: Product;
  onDelete?: () => void;
  onEdit?: () => void;
  mode?: Mode;
};

const ProductCard = ({
  product,
  mode = 'showcase',
  onDelete,
  onEdit,
}: Props) => {
  const { title, slug, price, category, images } = product;
  const [showPreview, setShowPreview] = useState(false);
  const cart = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (showPreview) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [showPreview]);

  const handleNavigate = () => {
    navigate(`/products/${slug}`);
  };

  const handlePreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    console.log('handle');
    setShowPreview(true);
  };

  const handleAddToCart = (event: MouseEvent, product: Product) => {
    event.stopPropagation();

    cart.addItem(product);
  };

  return (
    <>
      <div
        onClick={handleNavigate}
        className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
      >
        {/* Image & actions */}
        <div className="aspect-square rounded-md bg-gray-100 relative overflow-hidden">
          <img
            src={images?.[0]?.url ?? DefaultImage}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
            <div className="flex gap-x-6 justify-center">
              {mode === 'vendor' ? (
                <>
                  <IconButton
                    variant="white"
                    rounded
                    icon={LuPencil}
                    onClick={onEdit}
                  />

                  <IconButton
                    variant="white"
                    rounded
                    icon={LuTrash}
                    onClick={onDelete}
                  />
                </>
              ) : (
                <>
                  <IconButton
                    variant="white"
                    size="sm"
                    rounded
                    onClick={handlePreview}
                    icon={IoExpandOutline}
                  />

                  <IconButton
                    icon={IoCartOutline}
                    variant="white"
                    size="sm"
                    rounded
                    onClick={(e) => handleAddToCart(e, product)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        {/* Description */}
        <div>
          <p className="font-semibold text-lg">{title}</p>
          <p className="text-sm text-gray-500">{category?.name}</p>
        </div>
        {/* Price & Review */}
        <div className="flex items-center justify-between">
          <Currency value={price} />
          <Ratings ratings={[{ star: 4, postedBy: '' }]} />
        </div>
      </div>
      <AnimatePresence>
        {showPreview && (
          <PreviewModal
            product={product}
            onClose={() => setShowPreview(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
