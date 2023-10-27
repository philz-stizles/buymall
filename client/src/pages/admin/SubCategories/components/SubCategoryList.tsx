import { SubCategory } from '../../../models/sub-category'
import SubCategoryItem from './SubCategoryItem'

type SubCategoryListProps = {
    items: SubCategory[]
}

const SubCategoryList = ({ items }: SubCategoryListProps) => {
  return (
    <ul>{items && items.map(item => <SubCategoryItem key={item.id} item={item} />)}</ul>
  )
}

export default SubCategoryList