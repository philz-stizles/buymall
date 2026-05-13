import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocalQuery, useLocalMutation } from '../../../hooks';
import { Product } from '../../../models/product';
import { Container } from '../../../components/shared';
import RelatedProducts from './components/RelatedProducts/RelatedProducts';
import SingleProduct from './components/SingleProduct/SingleProduct';
import { Gallery, PageLoader } from '../../../components/ui';

const ProductDetails = () => {
  const [star, setStar] = useState(0);
  const { slug } = useParams();
  const {
    data: product,
    isLoading,
    reload,
  } = useLocalQuery<Product | null>(slug ? `/products/${slug}` : null, null);
  const { data: relatedProducts, isLoading: isLoadingRp } = useLocalQuery<
    Product[]
  >(product ? `/products/${product?.id}/related` : null, []);
  const {
    isLoading: isLoadingSpr,
    error,
    mutate: setProductRating,
  } = useLocalMutation<{ newRating: number; name: string[] }, any>(
    '/products/',
    {
      onSuccess: () => {
        reload();
      },
    }
  );

  // useEffect(() => {
  //   if (product.ratings && user) {
  //     let existingRatingObject = product.ratings.find(
  //       (ele) => ele.postedBy.toString() === user._id.toString()
  //     );
  //     existingRatingObject && setStar(existingRatingObject.star); // current user's star
  //   }
  // }, [product.ratings, user]);

  const onStarClick = (newRating: number, name: string[]) => {
    setStar(newRating);
    console.table(newRating, name);
    setProductRating({ newRating, name });
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {product?.images && <Gallery images={product.images} />}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            {/* <Info data={product} /> */}
            <SingleProduct
              product={product!}
              onStarClick={onStarClick}
              star={star}
            />
          </div>
        </div>
        <hr className="my-10" />
        <RelatedProducts title="Related Products" items={relatedProducts} />
      </div>
    </Container>
  );
};

export default ProductDetails;
