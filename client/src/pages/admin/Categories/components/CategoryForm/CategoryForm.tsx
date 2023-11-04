import React, { useCallback, useState } from 'react';
import { Button, Input, TextArea } from '../../../../../components/ui';
import useLocalMutation from '../../../../../hooks/use-local-mutation';
import { stagger, useAnimate } from 'framer-motion';

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onReload?: () => void;
};

const CategoryForm = ({ onClose, onReload }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { isLoading, error, mutate } = useLocalMutation('/categories', {
    onSuccess: () => {
      clearForm();
      onReload && onReload();
      onClose();
    },
  });
  const [scope, animate] = useAnimate();

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

      mutate({ name, description });

      // toast.success('A new category was created successful');
    },
    [description, handleFormValidation, mutate, name]
  );

  return (
    <form
      aria-label="form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      ref={scope}
    >
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
        <Button
          disabled={!formIsValid}
          size="md"
          loading={isLoading}
          type="submit"
          label="Create"
        />
      </div>
    </form>
  );
};

export default CategoryForm;
