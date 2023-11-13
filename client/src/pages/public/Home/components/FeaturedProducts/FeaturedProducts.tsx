import ProductCard from '../../../../../components/cards/ProductCard/ProductCard';
import { Section } from '../../../../../components/shared';

type Props = {
  subTitle: string;
};

const FeaturedProducts = ({ subTitle }: Props) => {
  return (
    <Section subTitle={subTitle} headingAlignment="left">
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            id: '1',
            title: 'Wooden House, Florida',
            slug: 'product_1',
            price: 24.0,
            description: '',
            ratings: [{ star: 4, postedBy: '' }],
          },
          {
            id: '2',
            title: 'Wooden House, Florida',
            slug: 'product_2',
            description: '',
            price: 24.0,
            ratings: [{ star: 4, postedBy: '' }],
          },
          {
            id: '3',
            title: 'Wooden House, Florida',
            slug: 'product_3',
            description: '',
            price: 24.0,
            ratings: [{ star: 4, postedBy: '' }],
          },
          {
            id: '4',
            title: 'Wooden House, Florida',
            slug: 'product_3',
            description: '',
            price: 24.0,
            ratings: [{ star: 4, postedBy: '' }],
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
