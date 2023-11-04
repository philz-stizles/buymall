import React, { useCallback, useState } from 'react';
import { Button, Input, TextArea } from '../../../../../components/ui';
import useLocalMutation from '../../../../../hooks/use-local-mutation';
import { stagger, useAnimate } from 'framer-motion';
import useLocalQuery from '../../../../../hooks/use-local-query';
import { Category } from '../../../../../components/cards/CategoryCard/CategoryCard';
import { Select } from '../../../../../components/form';
import { baseUrl } from '../../../../../utils/constants';

type Props = {
  onClose: () => void;
  onReload?: () => void;
};

const SubCategoryForm = ({ onClose, onReload }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const { data: categories } = useLocalQuery<Category[]>(
    `${baseUrl}/categories`,
    []
  );
  const { isLoading, error, mutate } = useLocalMutation('/sub-categories', {
    onSuccess: () => {
      onReload && onReload();
      onClose();
    },
  });
  const [scope, animate] = useAnimate();

  const clearForm = () => {
    setName('');
    setDescription('');
  };

  const handleFormValidation = useCallback(() => {
    if (!name || !description) {
      animate(
        'input, textarea',
        { x: [-10, 0, 10, 0] },
        { type: 'spring', duration: 0.2, delay: stagger(0.05) }
      );
      return;
    }
  }, [animate, description, name]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      console.log(name, description, category);

      handleFormValidation();

      mutate({ name, description, category });

      clearForm();

      // toast.success('A new category was created successful');
    },
    [category, description, handleFormValidation, mutate, name]
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" ref={scope}>
      {error && <small>{error.message}</small>}
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="E.g. DevOps"
      />
      <Select
        label="Select a category"
        options={categories}
        onChange={(e) => setCategory(e.target.value)}
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex justify-end items-center gap-3 pt-2">
        <Button
          size="md"
          disabled={isLoading}
          variant="outlined"
          label="Cancel"
          onClick={onClose}
        />
        <Button size="md" loading={isLoading} type="submit" label="Save" />
      </div>
    </form>
  );
};

export default SubCategoryForm;

// import {
//   ChangeEvent,
//   FocusEvent,
//   FormEvent,
//   useCallback,
//   useState,
// } from 'react';
// import { Button, Input } from '../../../../../components/ui';
// import { isEmpty } from '../../../../../utils/validation';
// import Select from '../../../../../components/form/Select/Select';
// import { Category } from '../../../../../models/category';
// import useLocalQuery from '../../../../../hooks/use-local-query';

// export interface SubCategoryFormValues {
//   name: string;
//   description: string;
// }

// type Props = {
//   isLoading?: boolean;
//   onSubmit: (data: SubCategoryFormValues) => Promise<void>;
//   onCancel: () => void;
// };

// const AddSubCategory = ({ onSubmit, onCancel, isLoading = false }: Props) => {
//   const { data: categories } = useLocalQuery<Category[]>('/categories', []);
//   const [{ value: name, isTouched: nameIsTouched }, setName] = useState({
//     value: '',
//     errorMessage: '',
//     isTouched: false,
//   });
//   const [
//     { value: description, isTouched: descriptionIsTouched },
//     setDescription,
//   ] = useState({
//     value: '',
//     errorMessage: '',
//     isTouched: false,
//   });

//   const nameIsInValid = isEmpty(name) && nameIsTouched;
//   const descriptionIsInValid = isEmpty(description) && descriptionIsTouched;
//   const formIsValid = nameIsInValid || descriptionIsInValid;

//   const resetForm = () => {
//     setName({ value: '', errorMessage: '', isTouched: false });
//     setDescription({ value: '', errorMessage: '', isTouched: false });
//   };

//   const submitHandler = useCallback(
//     async (e: FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       if (nameIsInValid || descriptionIsInValid) {
//         return;
//       }

//       onSubmit({ name, description });
//       resetForm();
//     },
//     [name, description, descriptionIsInValid, nameIsInValid, onSubmit]
//   );

//   return (
//     <form onSubmit={submitHandler}>
//       <Input
//         disabled={isLoading}
//         label="Name"
//         value={name}
//         isValid={!nameIsInValid}
//         onChange={(e: ChangeEvent<HTMLInputElement>) => {
//           setName((prev) => ({ ...prev, value: e.target.value }));
//         }}
//         onBlur={(e: FocusEvent<HTMLInputElement>) => {
//           setName((prev) => {
//             return { ...prev, isTouched: true };
//           });
//         }}
//       />
//       <Input
//         label="Description"
//         disabled={isLoading}
//         value={description}
//         isValid={!descriptionIsInValid}
//         onChange={(e: ChangeEvent<HTMLInputElement>) => {
//           setDescription((prev) => ({ ...prev, value: e.target.value }));
//         }}
//         onBlur={(e: FocusEvent<HTMLInputElement>) => {
//           setDescription((prev) => ({ ...prev, isTouched: true }));
//         }}
//       />
//       <Select options={categories} />
//       <div className="flex items-center gap-1">
//         <Button
//           label="Cancel"
//           outlined
//           disabled={isLoading}
//           onClick={onCancel}
//         />
//         <Button
//           type="submit"
//           label="Save"
//           disabled={!formIsValid || isLoading}
//         />
//       </div>
//     </form>
//   );
// };

// export default AddSubCategory;
