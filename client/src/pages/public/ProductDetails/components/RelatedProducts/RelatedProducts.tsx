import { ProductCard } from '../../../../../components/cards';
import { Product } from '../../../../../models/product';

type Props = {
  products: Product[];
};

const RelatedProducts = ({ products }: Props) => {
  return (
    <>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>

      <div className="row pb-5">
        {products.length ? (
          products.map((product) => (
            <div key={product.id} className="col-md-4">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="text-center col">No Products Found</div>
        )}
      </div>
    </>
  );
};

export default RelatedProducts;
