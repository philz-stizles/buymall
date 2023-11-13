import React, { useCallback, useEffect, useState } from 'react';
import { Button, FileUpload } from '../../../../../components/ui';
import useLocalMutation from '../../../../../hooks/use-local-mutation';
import { stagger, useAnimate } from 'framer-motion';
import { useLocalQuery } from '../../../../../hooks';
import { SubCategory } from '../../../../../models/sub-category';
import {
  Input,
  TextArea,
  Checkbox,
  Select,
} from '../../../../../components/form';
import { baseUrl } from '../../../../../utils/constants';
import { Category } from '../../../../../models/category';

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onReload?: () => void;
};

const ProductForm = ({ onClose, onReload }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState('');
  const [hasShipping, setHasShipping] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState<string>('');
  const [subCategory, setSubCategory] = useState<string>('');
  const [isPublished, setIsPublished] = useState(false);
  const { data: categories } = useLocalQuery<Category[]>(
    `${baseUrl}/categories`,
    []
  );
  const { data: subCategories, reload: reloadSubCategories } = useLocalQuery<
    SubCategory[]
  >(`${baseUrl}/categories/${category}/sub-categories`, []);
  const { isLoading, error, mutate } = useLocalMutation('/products', {
    onSuccess: () => {
      clearForm();
      onReload && onReload();
      onClose();
    },
  });
  const [scope, animate] = useAnimate();

  const formIsValid = title.trim() !== '';

  useEffect(() => {
    reloadSubCategories();
  }, [category, reloadSubCategories]);

  const clearForm = () => {
    setTitle('');
    setDescription('');
  };

  const handleFormValidation = useCallback(() => {
    if (!title || !description) {
      animate(
        'input, textarea',
        { x: [-10, 0, 10, 0] },
        { type: 'spring', duration: 0.2, delay: stagger(0.05) }
      );
      return;
    }
  }, [animate, description, title]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      handleFormValidation();

      mutate({
        title,
        description,
        price,
        quantity,
        images,
        category,
        subCategory,
        hasShipping,
        inStock,
        isPublished,
      });

      // toast.success('A new product was created successful');
    },
    [
      handleFormValidation,
      mutate,
      title,
      description,
      price,
      quantity,
      images,
      category,
      subCategory,
      hasShipping,
      inStock,
      isPublished,
    ]
  );

  return (
    <form
      aria-label="form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      ref={scope}
    >
      {error && <small>{error.message}</small>}
      <FileUpload title='Upload an Image' files={images} setFiles={setImages} />
      <Input
        id="title"
        label="Name"
        disabled={isLoading}
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="E.g. DevOps"
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          min={0}
          defaultValue={0.0}
          step={0.01}
          id="price"
          label="Price"
          disabled={isLoading}
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="E.g. 23.04"
        />
        <Input
          type="number"
          min={0}
          defaultValue={1}
          id="quantity"
          label="Quantity"
          disabled={isLoading}
          required
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="E.g. 10"
        />
        <Select label="Color" options={[]} />
      </div>

      <Select
        label="Select a Category"
        options={categories}
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {category && (
        <Select
          label="Select a Sub Category"
          options={subCategories}
          onChange={(e) => {
            setSubCategory(e.target.value);
          }}
        />
      )}
      <div className="grid grid-cols-3 gap-4 py-2">
        <Checkbox
          label="InStock"
          checked={inStock}
          onChange={(e) => setInStock(e.target.checked)}
        />
        <Checkbox
          label="Has Shipping"
          checked={hasShipping}
          onChange={(e) => setHasShipping(e.target.checked)}
        />
        <Checkbox
          label="Is Published"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
        />
      </div>

      <div className="flex justify-end items-center gap-3 pt-2">
        <Button
          size="md"
          disabled={isLoading}
          variant="outlined"
          label="Cancel"
          onClick={onClose}
        />
        <Button
          disabled={!formIsValid}
          size="md"
          loading={isLoading}
          type="submit"
          label="Save"
        />
      </div>
    </form>
  );
};

export default ProductForm;
