import CouponList from "./components/CouponList";
import { Button } from "../../components/ui";
import { MdAdd } from "react-icons/md";
import { baseUrl } from "../../utils/api";

const Coupons = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="font-normal text-xl text-slate-500">Coupons</h2>
        <div className="flex items-center gap-1">
          <Button label="Add New" icon={MdAdd} href="/coupons/new" />
        </div>
      </div>
      <CouponList />
    </div>
  );
};

export const loader = async () => {
  const response = await fetch(`${baseUrl}/coupons`);
  const json = await response.json();
  console.log(json);
  return json.data;
};

export default Coupons;
