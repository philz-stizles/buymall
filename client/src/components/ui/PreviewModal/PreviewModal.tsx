import { IoCartOutline, IoCloseOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import IconButton from '../IconButton/IconButton';
import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import { Product } from '../../../models/product';
import Gallery from '../Gallery/Gallery';

type Props = {
  product: Product;
  onClose: () => void;
};

const PreviewModal = ({
  product: { images, title, price },
  onClose,
}: Props) => {
  return createPortal(
    <div className="relative z-10">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="w-full max-w-3xl overflow-hidden rounded-lg text-left align-middle">
            <motion.dialog
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              open
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"
            >
              <IconButton
                rounded
                variant="white"
                icon={IoCloseOutline}
                className="absolute right-4 top-4"
                onClick={onClose}
              />
              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="sm:col-span-4 lg:col-span-5">
                  {images && <Gallery images={images} />}
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {title}
                    </h1>
                    <div className="mt-3 flex items-end justify-between">
                      <p className="text-2xl text-gray-900">
                        <div className="font-semibold">${price}</div>
                      </p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex flex-col gap-y-6">
                      <div className="flex items-center gap-x-4">
                        <h3 className="font-semibold text-black">Size:</h3>
                        <div>9</div>
                      </div>
                      <div className="flex items-center gap-x-4">
                        <h3 className="font-semibold text-black">Color:</h3>
                        <div
                          className="h-6 w-6 rounded-full border border-gray-600"
                          // style="background-color: rgb(224, 49, 49);"
                        ></div>
                      </div>
                    </div>
                    <div className="mt-10 flex items-center gap-x-3">
                      <Button label="Add To Cart" iconLeft={IoCartOutline} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.dialog>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal')!
  );
};

export default PreviewModal;
