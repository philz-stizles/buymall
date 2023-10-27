import FEATURES from '../../../../../data/services';
import { Container  } from '../../../../../components/shared';
import ServiceCard from '../../../../../components/cards/ServiceCard/ServiceCard';

const Services = () => {
  return (
    <section id="features">
      <Container>
        <div className="grid grid-cols-3 gap-4 pt-20">
          {FEATURES.slice(0, 3).map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Services;
