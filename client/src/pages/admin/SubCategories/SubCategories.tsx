import { useCallback, useEffect, useState } from "react";
import { SubCategory } from "../../models/sub-category";
import SubCategoryList from "./components/SubCategoryList";
import { Button, EmptyState } from "../../components/ui";
import { MdAdd } from "react-icons/md";
import { useModal } from "../../hooks/use-modal";
import AddSubCategory, {
  SubCategoryFormValues,
} from "./components/AddSubCategory";
import SubCategoryModal from "./components/SubCategoryModal";

const SubCategories = () => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Type will be inferred.
  const [error, setError] = useState<any>(null);
  const { modalIsShowing, showModal, hideModal } = useModal();

  const fetchSubCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/v1/sub-category");
      const json = await response.json();
      console.log(json);
      setSubCategories(json.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const submitHandler = useCallback(async (data: SubCategoryFormValues) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/v1/sub-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await response.json();
      console.log(json);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <h2>Sub Categories</h2>
        <div className="flex items-center gap-1">
          <Button label="New" icon={MdAdd} onClick={showModal} />
        </div>
      </div>

      <SubCategoryModal
        isOpen={modalIsShowing}
        title="Add New Sub Category"
        onClose={hideModal}
      >
        <AddSubCategory
          onSubmit={submitHandler}
          onCancel={hideModal}
          isLoading={isLoading}
        />
      </SubCategoryModal>

      {/* {modalIsShowing && (
        <SubCategoryModal title="Add New Sub Category" onClose={hideModal}>
          <AddSubCategory onSubmit={submitHandler} onCancel={hideModal} isLoading={isLoading} />
        </SubCategoryModal>
      )} */}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && subCategories.length <= 0 && (
        <EmptyState title="No sub categories" description="" />
      )}
      {!isLoading && !error && subCategories.length > 0 && (
        <SubCategoryList items={subCategories} />
      )}
      {/* {!isLoading && error && <p>{error}</p>} */}
    </>
  );
};

export default SubCategories;

// const fetchMoviesAsync = React.useCallback(async () => {
//   try {
//     setIsLoading(true);
//     setError(null);
//     const response = await fetch("https://swapi.py4e.com/api/films");
//     console.log(response);

//     if (response.status) {
//     }
//     if (!response.ok) {
//       throw Error("Something went wrong");
//     }

//     const data = await response.json();
//     console.log(data);

//     const transformedData = data.results.map((datum) => {
//       return {
//         id: datum.episode_id,
//         title: datum.title,
//         openingText: datum.opening_crawl,
//         releaseDate: datum.release_date,
//       };
//     });

//     // // Firebase transform.
//     // const transformedData = Object.keys(data).map((key) => {
//     //   return {
//     //     id: key,
//     //     title: data[key].title,
//     //     openingText: data[key].openingText,
//     //     releaseDate: data[key].releaseDate,
//     //   };
//     // });

//     setMovies(transformedData);
//   } catch (error) {
//     setError(error.message);
//   }

//   setIsLoading(false);
// }, []);

// React.useEffect(() => {
//   fetchMoviesAsync();
// }, [fetchMoviesAsync]);

// const addMovieAsync = async () => {
//   try {
//     setIsLoading(true);
//     setError(null);
//     const response = await fetch("https://swapi.py4e.com/api/films", {
//       method: "POST",
//       body: JSON.stringify({}),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(response);

//     if (response.status) {
//     }
//     if (!response.ok) {
//       throw Error("Something went wrong");
//     }

//     const data = await response.json();
//     console.log(data);

//     await fetchMoviesAsync();
//   } catch (error) {
//     setError(error.message);
//   }

//   setIsLoading(false);
// };
