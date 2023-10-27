// import { MongoClient } from 'mongodb';
import UserStore, { Users } from '@src/graphql/data-sources/mongodb/Users';
import CouponStore, {
  Coupons,
} from '@src/graphql/data-sources/mongodb/Coupons';
import ProductStore, {
  Products,
} from '@src/graphql/data-sources/mongodb/Products';
import CartStore, { Carts } from '@src/graphql/data-sources/mongodb/Carts';
import CategoryStore, {
  Categories,
} from '@src/graphql/data-sources/mongodb/Categories';

type MongoDataSources = {
  users: Users;
  carts: Carts;
  categories: Categories;
  coupons: Coupons;
  products: Products;
};

export default (): MongoDataSources => {
  // const client = new MongoClient('mongodb://localhost:27017/test');
  // client.connect();

  return {
    users: UserStore,
    carts: CartStore,
    categories: CategoryStore,
    coupons: CouponStore,
    products: ProductStore,
    // users: new Users(client.db().collection('users')),
  };
};
