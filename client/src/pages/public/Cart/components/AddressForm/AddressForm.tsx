import { useCallback, useState } from 'react';
import { Button, TextArea } from '../../../../../components/ui';
import { toast } from 'sonner';
import { useLocalMutation } from '../../../../../hooks';

type Props = {};

const AddressForm = (props: Props) => {
  const [address, setAddress] = useState('');
  const { isLoading, mutate } = useLocalMutation('/users/address', {
    onSuccess: () => {
      // setAddressSaved(true);
      toast.success('Address saved');
    },
  });

  const handleSaveAddress = useCallback(() => {
    mutate({ address });
  }, [address, mutate]);

  return (
    <section>
      <TextArea
        label="Delivery Address"
        className="mb-4"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button label="Save" onClick={handleSaveAddress} loading={isLoading} />
    </section>
  );
};

export default AddressForm;
