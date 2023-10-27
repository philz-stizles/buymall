import { IoCalendar, IoPerson } from "react-icons/io5";

export type Blog = {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  author: {
    name: string;
  };
  createdAt: string;
};

type Props = {
  item: Blog;
};

const BlogCard = ({
  item: { title, imageUrl, category, author, createdAt },
}: Props) => {
  return (
    <div className="">
      <figure className="overflow-hidden rounded-lg">
        <img className="w-full h-auto" src={imageUrl} alt={title} />
      </figure>
      <div className="py-4">
        <div className="mb-1">
          <span className="text-sm text-slate-600 font-light bg-slate-100 rounded-md p-1">
            {category}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <div className="flex justify-between items-start text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <IoPerson size={18} /> <span>by {author?.name}</span>
          </div>
          <span className="flex items-center gap-2">
            <IoCalendar size={18} />
            <span>{createdAt}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
