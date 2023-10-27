import { IoArrowForward, IoCart } from 'react-icons/io5';
import { Button } from '../../../../../components/ui';
import Jumbotron from '../Jumbotron/Jumbotron';
import { BsArrowBarRight } from 'react-icons/bs';

const Cta = () => {
  return (
    <section className="relative min-h-[80vh] bg-no-repeat bg-cover bg-center  bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.8)),url('/images/cta-img.jpg')]">
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-center">
        <h1 className=" text-6xl font-semibold mb-12">
          <span>Discover products from</span>
          <Jumbotron
            text={['Latest Products', 'New Arrivals', 'Best Sellers']}
          />
          <span>and shop with confidence</span>
        </h1>

        {/* <p className="text-lg mb-8">
          Explore a world of choices, find unbeatable deals, and transform your
          shopping experience. Don't wait – start adding to your cart now and
          experience the convenience of shopping at its best.{' '}
        </p> */}
        <div className="flex justify-center items-center gap-4">
          <Button size="lg" label="Shop Now" />
        </div>
      </div>
    </section>
  );
};

export default Cta;
