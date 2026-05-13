import { ProductCard } from '../../../../../components/cards';
import { NoResults } from '../../../../../components/ui';
import { Product } from '../../../../../models/product';

type Props = {
  title?: string;
  items: Product[];
};

const RelatedProducts = ({ items, title }: Props) => {
  return (
    <div className="space-y-4">
      {title && <h3 className="font-bold text-3xl">{title}</h3>}
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
