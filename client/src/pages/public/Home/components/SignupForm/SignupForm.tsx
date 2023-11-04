import React, { useCallback, useState } from 'react';
import { Button, Input } from '../../../../../components/ui';
import useLocalMutation from '../../../../../hooks/use-local-mutation';
import { stagger, useAnimate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onReload?: () => void;
};

const SignupForm = ({ onClose, onReload }: Props) => {
  const [companyName, setCompanyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { isLoading, error, mutate } = useLocalMutation('/auth/vendor-signup', {
    onSuccess: () => {
      clearForm();
      onClose();
      navigate('/signup');
    },
  });
  const [scope, animate] = useAnimate();

  const formIsValid = companyName.trim() !== '' && email && password;

  const clearForm = () => {
    setCompanyName('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  const handleFormValidation = useCallback(() => {
    if (!companyName || !email) {
      animate(
        'input, textarea',
        { x: [-10, 0, 10, 0] },
        { type: 'spring', duration: 0.2, delay: stagger(0.05) }
      );
      return;
    }
  }, [animate, email, companyName]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      handleFormValidation();

      mutate({
        companyName,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      // toast.success('A new category was created successful');
    },
    [
      handleFormValidation,
      mutate,
      companyName,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
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
      <Input
        id="companyName"
        label="Business Name"
        disabled={isLoading}
        required
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="E.g. XYZ Inc."
      />
      <div className="flex items-center gap-4">
        <Input
          id="firstName"
          label="First name"
          disabled={isLoading}
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="John"
        />
        <Input
          id="lastName"
          label="Last name"
          disabled={isLoading}
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Doe"
        />
      </div>
      <Input
        type="email"
        id="email"
        label="Email"
        disabled={isLoading}
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E.g. someone@mail.com"
      />
      <Input
        type="password"
        id="password"
        label="Password"
        disabled={isLoading}
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        id="confirmPassword"
        label="Confirm password"
        disabled={isLoading}
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div className="flex justify-end items-center gap-3 pt-2">
        <Button
          expanded
          disabled={!formIsValid}
          size="md"
          loading={isLoading}
          type="submit"
          label="Signup"
        />
      </div>
    </form>
  );
};

export default SignupForm;
