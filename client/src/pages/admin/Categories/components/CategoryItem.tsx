import { Category } from "../../../models/category"

type CategoryItemProps = {
    item: Category
}

const CategoryItem = ({ item }: CategoryItemProps) => {
  return (
    <div>
      <div>{item.name}</div>
    </div>
  )
}

export default CategoryItem