import classNames from 'classnames';
import { IoArrowForwardOutline } from 'react-icons/io5';

export type Category = {
  id: string;
  name: string;
  imageUrl: string;
  productCount: number;
};

type Props = {
  item: Category;
  index: number;
};

const CategoryCard = ({
  item: { name, imageUrl  },
  index,
}: Props) => {
  return (
    <div
      className={classNames(
        'relative flex overflow-hidden rounded-lg',
        index === 0 && 'max-h-96 col-span-2',
        index === 1 && ' max-h-fit row-span-2'
        // index === 3 && 'col-span-2'
      )}
    >
      <img className="w-full h-auto object-cover transition scale-100 hover:scale-110" src={imageUrl} alt={name} />
      <div className="absolute top-0 bottom-0 left-0 right-0 z-10 md:rounded bg-gradient-to-b from-transparent via-transparent/25 to-black/80"></div>
      <div className="absolute left-0 bottom-0 right-0 p-6 flex z-20 justify-between items-end text-white ">
        <div className="w-10/12">
          <h2 className="mb-1 text-xl font-bold">{name}</h2>
          <p className="font-normal">
            Find savings and incentives tailored for active duty military,
            veterans, and family.
          </p>
          {/* <p className="text-sm font-normal">{productCount}+ items</p> */}
        </div>
        <div className="rounded-full bg-slate-50 text-slate-950 shadow-md p-1">
          <IoArrowForwardOutline size={18} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
