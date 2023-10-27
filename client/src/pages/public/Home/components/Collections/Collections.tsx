import CategoryCard from '../../../../../components/cards/CategoryCard/CategoryCard';
import { Section } from '../../../../../components/shared';
import CATEGORIES from '../../../../../data/categories';

const Collections = () => {
  // const { data: categories } = useFetch<Category[]>(CATEGORIES);
  return (
    <Section
      id="categories"
      title="Collections"
      subTitle="Discover Our Unique Collection of Exclusive Categories"
      className="bg-slate-50"
    >
      <div className="grid grid-cols-3 gap-4 py-4 aspect-video">
        {CATEGORIES.slice(0, 4).map((item, i) => (
          <CategoryCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
};

export default Collections;
