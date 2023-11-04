import { IoDownload } from 'react-icons/io5';
import { useLocalQuery } from '../../../hooks';
import { baseUrl } from '../../../utils/constants';
import { Product } from '../../../models/product';
import { Fragment } from 'react';
import { Button } from '../../../components/ui';
import DefaultImage from './../../../assets/images/image-placeholder.png';

const Products = () => {
  const {
    data: products,
    isLoading,
    error,
    reload,
  } = useLocalQuery<Product[]>(`${baseUrl}/products`, []);

  return (
    <Fragment>
      <div className="flex items-center justify-between space-y-2 py-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Products</h2>
          <p className="text-muted-foreground">
            Here's a list of your tasks for this month!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button label="Download" iconLeft={IoDownload} onClick={() => {}} />
        </div>
      </div>
      <div></div>
      <ul className="grid grid-cols-4">
        {products.map((product) => (
          <li className="flex flex-col gap-4 bg-white p-2" key={product.id}>
            <figure className="overflow-hidden rounded-lg">
              <img
                className="w-full h-full object-cover object-center"
                src={product.imageSrc || DefaultImage}
                alt={product.title}
              />
            </figure>
            <div className="px-2">
              <h2 className=" text-slate-500 font-medium mb-2">
                {product.title}
              </h2>
              <div>
                <span className="text-slate-700 text-lg font-semibold">
                  ${product.price}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Products;
