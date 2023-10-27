import { SubCategory } from "../../../models/sub-category"

type Props = {
    item: SubCategory
}

const SubCategoryItem = ({ item }: Props) => {
  return (
    <div>
      <div>{item.name}</div>
    </div>
  )
}

export default SubCategoryItem