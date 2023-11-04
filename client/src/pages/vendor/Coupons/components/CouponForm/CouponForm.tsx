import React, { useCallback, useState } from 'react';
import { Button, Input, TextArea } from '../../../../../components/ui';
import useLocalMutation from '../../../../../hooks/use-local-mutation';
import { stagger, useAnimate } from 'framer-motion';

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onReload?: () => void;
};

const CouponForm = ({ onClose, onReload }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState(0.0);
  const [expiry, setExpiry] = useState('');
  const { isLoading, error, mutate } = useLocalMutation('/coupons', {
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

      mutate({ name, description, discount, expiry });

      // toast.success('A new product was created successful');
    },
    [description, handleFormValidation, mutate, name, discount, expiry]
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
        label="Code"
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
      />

      <Input
        id="discount"
        min={0}
        max={1}
        step={0.01}
        type='number'
        label="Discount"
        disabled={isLoading}
        required
        value={discount}
        onChange={(e) => setDiscount(Number(e.target.value))}
        placeholder="23.49"
      />

      <Input
        type="date"
        id="expiry"
        label="Expiry"
        disabled={isLoading}
        required
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        placeholder="23.49"
      />

      <div></div>

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

export default CouponForm;
