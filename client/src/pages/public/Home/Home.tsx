import Blogs from './components/Blog/Blog';
import Collections from './components/Collections/Collections';
import Cta from './components/Cta/Cta';
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts';
import FindStore from './components/FindStore/FindStore';
import Services from './components/Services/Services';
import Testimonials from './components/Testimonials/Testimonials';

const Home = () => {
  
  return (
    <>
      <Cta />
      <Services />
      <FeaturedProducts subTitle="New Arrivals" />
      <FeaturedProducts subTitle="Featured Products" />
      <Collections />
      <Blogs />
      <FindStore />
      <Testimonials />
      
    </>
  );
};

export default Home;
