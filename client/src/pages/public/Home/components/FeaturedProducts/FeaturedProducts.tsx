import { ProductCard } from '../../../../../components/cards';
import { Section } from '../../../../../components/shared';
import { useLocalQuery } from '../../../../../hooks';
import { Product } from '../../../../../models/product';

type Props = {
  subTitle: string;
};

const FeaturedProducts = ({ subTitle }: Props) => {
  const { data: pagedProducts } = useLocalQuery<Product[]>('/products', []);
  return (
    <Section subTitle={subTitle} headingAlignment="left">
      <div className="grid grid-cols-4 gap-4">
        {pagedProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Section>
  );
};

export default FeaturedProducts;
