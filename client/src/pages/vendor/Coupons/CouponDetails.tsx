import { useCallback } from "react";
import { Modal } from "../../../components/ui";
import { Params, useLoaderData, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/api";

const CouponDetails = () => {
  const coupon = useLoaderData()
  const navigate = useNavigate();

  const closeHandler = useCallback(() => {
    // navigate('..');
    navigate(-1);
  }, []);

  return (
    <Modal title="New Coupon" onClose={closeHandler}>
      <div>Details</div>
    </Modal>
  );
};

export const loader = async ({ params }: { params: Params}) => {
  const response = await fetch(`${baseUrl}/api/v1/coupons/${params.id}`);
  const json = await response.json();
  console.log(json);
  return json.data;
};

export default CouponDetails;
