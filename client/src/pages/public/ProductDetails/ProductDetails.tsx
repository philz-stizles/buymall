import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// UI Components.
import { useLocalQuery, useLocalMutation } from '../../../hooks';
import { Product } from '../../../models/product';
import { baseUrl } from '../../../utils/constants';
import { Container } from '../../../components/shared';
import RelatedProducts from './components/RelatedProducts/RelatedProducts';
import SingleProduct from './components/SingleProduct/SingleProduct';

const ProductDetails = () => {
  const [star, setStar] = useState(0);
  const { slug } = useParams();
  const {
    data: product,
    isLoading,
    reload,
  } = useLocalQuery<Product | null>(`${baseUrl}/products/${slug}`, null);
  const { data: relatedProducts, isLoading: isLoadingRp } = useLocalQuery<
    Product[]
  >(`${baseUrl}/products/${product?.id}/related`, []);
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

  return (
    <Container fluid>
      <SingleProduct product={product!} onStarClick={onStarClick} star={star} />
      <RelatedProducts products={relatedProducts} />
    </Container>
  );
};

export default ProductDetails;
