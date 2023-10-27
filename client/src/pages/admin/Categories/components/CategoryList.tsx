import Table from '../../../components/ui/Table/Table'
import { Category } from './../../../models/category'
// import CategoryItem from './CategoryItem'

type CategoryListProps = {
    items: Category[]
}

const CategoryList = ({ items }: CategoryListProps) => {
  return (
    <Table columns={['Name', 'Description', 'Date Created', 'Status', 'Action']} rows={items} />
  )
}

export default CategoryList