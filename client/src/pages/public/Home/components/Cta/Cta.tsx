import { Container } from '../../../../../components/shared';
import { Button } from '../../../../../components/ui';
import Jumbotron from '../Jumbotron/Jumbotron';

const Cta = () => {
  return (
    // <section className="relative min-h-[80vh] bg-no-repeat bg-cover bg-center  bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.8)),url('assets/images/cta-lady-with-bags.jpg')]">
    <section className="relative min-h-[80vh] bg-no-repeat bg-cover bg-right-top bg-[linear-gradient(to_right,rgba(0,0,0,0.8),rgba(0,0,0,0.6),rgba(0,0,0,0.0),rgba(0,0,0,0.0)),url('assets/images/cta-lady-with-bags.jpg')]">
      <Container>
        <div className="absolute top-1/2 -translate-y-1/2 text-white w-5/12">
          <h1 className="text-5xl font-medium mb-12 leading-snug uppercase">
            <span>Discover and shop with confidence from</span>
            <Jumbotron
              text={['Latest Products', 'New Arrivals', 'Best Sellers']}
            />
          </h1>

          {/* <p className="text-lg mb-8">
          Explore a world of choices, find unbeatable deals, and transform your
          shopping experience. Don't wait – start adding to your cart now and
          experience the convenience of shopping at its best.{' '}
        </p> */}
          <div className="flex justify-start items-center gap-4">
            <Button size="lg" label="Shop Now" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Cta;
