import ReactDOM from "react-dom";
import { MdAdd, MdDownload } from "react-icons/md";
import { Button } from "../../../components/ui";
import CategoryList from "./components/CategoryList";
import { Fragment } from "react";
import { Category } from "../../../models/category";
import { useFetch } from "../../../hooks/use-fetch";
import CategoryModal from "./components/CategoryModal";
import { useModalContext } from "../../../context/modal-context";
import { baseUrl } from "../../../utils/api";
// import Wrapper from "../../helpers/Wrapper"

const Categories = () => {
  const { data: categories, reload } = useFetch<Category[]>(
    [],
    `${baseUrl}/categories`
  );
  const { isShowing, openModal } = useModalContext();

  return (
    <Fragment>
      {isShowing &&
        ReactDOM.createPortal(
          <CategoryModal onReload={() => reload()} />,
          document.getElementById("modal-root") as Element
        )}

      <div className="flex justify-between items-center py-8">
        <h2 className="text-lg font-semibold">Category</h2>
        <div className="flex items-center gap-2">
          <Button label="Export CSV" icon={MdDownload} />
          <Button label="Export PDF" icon={MdDownload} />
          <Button label="Create" icon={MdAdd} onClick={() => openModal()} />
        </div>
      </div>
      <CategoryList items={categories} />
    </Fragment>
  );
};

export default Categories;
