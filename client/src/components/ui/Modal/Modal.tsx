import { PropsWithChildren } from "react";
import Button from "../Button/Button"
import { MdClose } from "react-icons/md";

type Props = {
  isOpen?: boolean;
  disabled?: boolean;
  title?: string;
  subtitle?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  onClose: () => void;
  onSubmit?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
};

const Modal = ({ title, body, children, onClose, onSubmit}: PropsWithChildren<Props>) => {
  return (
    <div className="fixed right-0 z-50 left-0 top-0 bottom-0 w-full h-screen overflow-x-hidden overflow-y-auto flex justify-center items-center bg-black/60 outline-none">
      <div className="rounded-md shadow-lg overflow-hidden bg-white w-[36rem] -translate-y-1/2">
        {/* Modal header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-200">
          <h5 className="text-xl font-medium leading-normal">{title}</h5>
          <MdClose className="cursor-pointer" size={20} onClick={onClose} />
        </div>

        {/* Modal body */}
        <div className="relative flex-auto p-7">{body}</div>

        {/* Modal footer */}
        {onSubmit && (
          <div className="flex flex-shrink-0 flex-wrap justify-end items-center gap-2 px-7 pb-7">
            <Button label="Cancel" onClick={onClose} />
            <Button label="Save" onClick={onSubmit} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal