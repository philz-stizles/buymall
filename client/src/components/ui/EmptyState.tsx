type Props = {
    title: string;
    description: string;
    image: string;
}

const EmptyState = ({title, description, image}: Props) => {
  return (
    <div className="text-center">
        {title && <h4 className="text-md mb-5 font-semibold">{title}</h4>}
        {description && <p className="mb-9 text-slate-500 text-sm">{description}</p>}
        {image && <img src={image} alt={title} />}
    </div>
  )
}

// .description {
//     margin-bottom: 2.4rem;
//     line-height: 1.8rem;
//     color: rgba(0,0,0,0.55);
// }

export default EmptyState