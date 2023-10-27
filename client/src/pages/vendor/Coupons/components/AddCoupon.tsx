import { Button, Input } from "../../../components/ui"
import { Form, redirect } from "react-router-dom";
import { baseUrl } from "../../../utils/api";

const AddCoupon = () => {
    return (
      <Form method="post">
        <Input label="Code" name="code" required />
        <Input label="Description" name="description" required />
        <Button type="submit" label="Save" />
      </Form>
    );
}

export const action = async ({ request }: { request: Request}) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const response = await fetch(`${baseUrl}/api/v1/coupons`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await response.json();
  console.log(json);
  return redirect('/coupons')
}

export default AddCoupon