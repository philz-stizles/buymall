import { PropsWithChildren } from 'react';
import { MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';

type Props = {
  isOpen?: boolean;
  disabled?: boolean;
  title?: string;
  subTitle?: string;
  footer?: React.ReactElement;
  actionLabel?: string;
  onClose: () => void;
  onSubmit?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
};

const Modal = ({
  title,
  subTitle,
  children,
  onClose,
}: PropsWithChildren<Props>) => {
  return createPortal(
    <div className="overlay" onClick={onClose}>
      <motion.dialog
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        open
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Modal header */}
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            {title}
          </h2>
          {subTitle && (
            <p className="text-sm text-muted-foreground">{subTitle}</p>
          )}
        </div>

        {/* Modal close button */}
        <button
          type="button"
          className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <MdClose className="cursor-pointer" size={18} onClick={onClose} />
          <span className="sr-only">Close</span>
        </button>

        {/* Modal body */}
        <div className="relative flex-auto pt-6">{children}</div>

        {/* Modal footer */}
        {/* {onSubmit && (
          <div className="flex flex-shrink-0 flex-wrap justify-end items-center gap-2 px-7 pb-7">
            <Button label="Cancel" onClick={onClose} />
            <Button label="Save" onClick={onSubmit} />
          </div>
        )} */}
      </motion.dialog>
    </div>,
    document.getElementById('modal')!
  );
};

export default Modal;
