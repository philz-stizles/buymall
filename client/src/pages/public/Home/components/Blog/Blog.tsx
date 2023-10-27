import BlogCard from '../../../../../components/cards/BlogCard/BlogCard';
import { Section } from '../../../../../components/shared';
import BLOGS from '../../../../../data/blogs';

const Blogs = () => {
  return (
    <Section title="Blog" subTitle="Our Latest Blog & News">
      <div className="grid grid-cols-3 gap-5">
        {BLOGS.slice(0).map((item) => (
          <BlogCard key={item.id} item={item} />
        ))}
      </div>
    </Section>
  );
};

export default Blogs;
