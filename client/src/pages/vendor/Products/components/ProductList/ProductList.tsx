import { ProductCard } from '../../../../../components/cards';
import { Product } from '../../../../../models/product';
import { Search } from '../../../../../components/form';

type Props = {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onView?: (product: Product) => void;
};

const ProductList = ({ products }: Props) => {
  return (
    <section className="flex flex-col gap-4 py-4">
      <Search />
      <ul className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} mode="vendor" />
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
