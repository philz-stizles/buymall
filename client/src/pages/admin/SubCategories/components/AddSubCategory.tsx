import { ChangeEvent, FocusEvent, FormEvent, useCallback, useState } from "react"
import { Button, Input } from "../../../components/ui"
import { isEmpty } from "../../../utils/validation";
import Select from "../../../components/ui/Select/Select";
import { baseUrl } from "../../../utils/api";
import { useFetch } from "../../../hooks/use-fetch";
import { Category } from "../../../models/category";

 export interface SubCategoryFormValues {
   name: string;
   description: string;
 }

type Props = {
  isLoading?: boolean;
  onSubmit: (data: SubCategoryFormValues) => Promise<void>;
  onCancel: () => void
};

const AddSubCategory = ({ onSubmit, onCancel, isLoading = false } : Props) => {
  const { data: categories } = useFetch<Category[]>(
    [],
    `${baseUrl}/categories`
  );
    const [{ value : name, isTouched: nameIsTouched }, setName] = useState({ 
      value: '', 
      errorMessage: '', 
      isTouched: false 
    })
    const nameIsInValid = isEmpty(name) && nameIsTouched;
    const [{ value: description, isTouched: descriptionIsTouched}, setDescription] = useState({
      value: '',
      errorMessage: '',
      isTouched: false,
    });
    const descriptionIsInValid = isEmpty(description) && descriptionIsTouched;
    const formIsValid = nameIsInValid || descriptionIsInValid;

    const resetForm = () => {
      setName({ value: '', errorMessage: '', isTouched: false });
      setDescription({ value: "", errorMessage: "", isTouched: false });
    }

    const submitHandler = useCallback(
      async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (nameIsInValid || descriptionIsInValid) {
          return;
        }

        onSubmit({name, description})
        resetForm()
      },
      [name, description, descriptionIsInValid, nameIsInValid, onSubmit]
    );

    return (
      <form onSubmit={submitHandler}>
        <Input
          disabled={isLoading}
          label="Name"
          value={name}
          isValid={!nameIsInValid}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName((prev) => ({ ...prev, value: e.target.value }));
          }}
          onBlur={(e: FocusEvent<HTMLInputElement>) => {
            setName((prev) => {
              return { ...prev, isTouched: true };
            });
          }}
        />
        <Input
        textarea
          label="Description"
          disabled={isLoading}
          value={description}
          isValid={!descriptionIsInValid}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setDescription((prev) => ({ ...prev, value: e.target.value }));
          }}
          onBlur={(e: FocusEvent<HTMLInputElement>) => {
            setDescription((prev) => ({ ...prev, isTouched: true }));
          }}
        />
        <Select options={categories} />
        <div className="flex items-center gap-1">
          <Button
            label="Cancel"
            outlined
            disabled={isLoading}
            onClick={onCancel}
          />
          <Button
            type="submit"
            label="Save"
            disabled={!formIsValid || isLoading}
          />
        </div>
      </form>
    );
}

export default AddSubCategory