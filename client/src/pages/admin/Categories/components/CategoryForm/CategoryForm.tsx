import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, TextArea } from '../../../../../components/ui';
import useLocalMutation from '../../../../../hooks/use-local-mutation';
import { stagger, useAnimate } from 'framer-motion';
import { Category } from '../../../../../models/category';
import { Checkbox, ImageSelector } from '../../../../../components/form';

type Props = {
  readonly?: boolean;
  data: Category | null;
  isOpen?: boolean;
  onClose: () => void;
  onReload?: (endpoint: string) => void;
};

const CategoryForm = ({ data, onClose, onReload, readonly }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const isEdit = data && data.id;
  const { isLoading, error, mutate } = useLocalMutation(
    `/categories${isEdit ? `/${data.id}` : ''}`,
    {
      options: {
        method: isEdit ? 'PATCH' : 'POST',
      },
      onSuccess: () => {
        clearForm();
        onReload && onReload('/categories');
        onClose();
      },
    }
  );
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (data) {
      setName(data.name);
      setDescription(data.description);
      setImage(data.image?.url ?? '');
      setIsPublished(data.isPublished);
    }
  }, [data]);

  const formIsValid = name.trim() !== '';

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

      handleFormValidation();

      mutate({ name, description, isPublished, image });

      // toast.success('A new product was created successful');
    },
    [handleFormValidation, mutate, name, description, image, isPublished]
  );

  return (
    <form
      aria-label="form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      ref={scope}
    >
      {error && <small>{error.message}</small>}

      <ImageSelector selected={image} onChange={(uri) => setImage(uri)} />

      <Input
        readOnly={readonly}
        id="name"
        label="Name"
        disabled={isLoading}
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="E.g. BUYM-COUP-0000"
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        readOnly={readonly}
      />

      <Checkbox
        label="Is Published?"
        outlined
        description="This category will be available in the store."
        checked={isPublished}
        onChange={(e) => setIsPublished(e.target.checked)}
      />

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
          label={isEdit ? 'Save Changes' : 'Create'}
        />
      </div>
    </form>
  );
};

export default CategoryForm;
