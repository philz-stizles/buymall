import { Product } from '../../../../../models/product';

type Props = {
  product: Product;
  onStarClick: (newRating: number, name: string[]) => void;
  star: number;
};

const SingleProduct = ({ product, onStarClick }: Props) => {
  return <div>SingleProduct</div>;
};

export default SingleProduct;
