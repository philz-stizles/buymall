import ProductCard from '../../../../../components/cards/ProductCard/ProductCard';
import { Section } from '../../../../../components/shared';

type Props = {
  subTitle: string
}

const FeaturedProducts = ({ subTitle}: Props) => {
  return (
    <Section subTitle={subTitle} headingAlignment="left">
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            id: '1',
            name: 'Wooden House, Florida',
            slug: 'product_1',
            description: '',
          },
          {
            id: '2',
            name: 'Wooden House, Florida',
            slug: 'product_2',
            description: '',
          },
          {
            id: '3',
            name: 'Wooden House, Florida',
            slug: 'product_3',
            description: '',
          },
          {
            id: '4',
            name: 'Wooden House, Florida',
            slug: 'product_3',
            description: '',
          },
        ]
          .slice(0, 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Section>
  );
};

export default FeaturedProducts;
