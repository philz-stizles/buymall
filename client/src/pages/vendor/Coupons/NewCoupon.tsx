import { useCallback } from "react";
import { Modal } from "../../components/ui";
import AddCoupon from "./components/AddCoupon";
import { useNavigate } from "react-router-dom";

const NewCoupon = () => {
  const navigate = useNavigate();
  const submitHandler = useCallback(async() => {}, []);

  const closeHandler =
    useCallback(() => {
      // navigate('..');
      navigate(-1);
    }, []);

  return (
    <Modal title="New Coupon" onClose={closeHandler}>
      <AddCoupon />
    </Modal>
  );
};

export default NewCoupon;
