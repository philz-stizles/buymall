import { useCallback, useState } from "react";
import { Heading, Input, Modal } from "../../../components/ui";
import { toast } from "react-hot-toast";
import { useModalContext } from "../../../context/modal-context";
import { baseUrl } from "../../../utils/api";

type Props = {
  onReload?: () => void;
};

const CategoryModal = ({ onReload }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { isShowing, closeModal } = useModalContext();

  const submitHandler = useCallback(async () => {
    console.log("submitHandler");
    try {
      if (!name || !description) {
        return;
      }
      setIsLoading(true);
      console.log("submitHandler");

      const response = await fetch(`${baseUrl}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });
      const json = await response.json();

      console.log(json);
      onReload && onReload();
      toast.success("A new category was created successful");
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [closeModal, description, name, onReload]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      {/* <Heading
      // title="Welcome to Airbnb"
      // subtitle="Create a category"
      /> */}
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
        placeholder="What is the name of the category?"
      />
      <Input
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
      />
    </div>
  );

  // const footerContent = (
  //   <div className="flex flex-col gap-4 mt-3">
  //     <hr />
  //     <Button
  //       label="Save"
  //       onClick={() => submitHandler()}
  //     />

  //   </div>
  // );

  return (
    <Modal
      title="Create a new category"
      body={bodyContent}
      // footer={footerContent}
      isOpen={isShowing}
      disabled={isLoading}
      actionLabel="Save"
      onSubmit={submitHandler}
      onClose={closeModal}
    />
  );
};

export default CategoryModal;
