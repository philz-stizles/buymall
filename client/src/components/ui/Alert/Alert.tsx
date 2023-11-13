import { PropsWithChildren } from 'react';
import { MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import { TbInfoSquareRounded } from 'react-icons/tb';

type Props = {
  isLoading?: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  onSubmit?: () => void;
};

const Alert = ({
  title,
  description,
  children,
  onClose,
  onSubmit,
  isLoading = false,
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
        {/* Alert header */}
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 sm:mx-0 sm:h-10 sm:w-10">
            <TbInfoSquareRounded size={24} />
          </div>

          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            {/* text-base font-semibold leading-6 text-gray-900 */}
            <h2 className="text-lg font-semibold leading-6 tracking-tight text-slate-900">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-slate-500 mt-2">
                <span>Are you sure you want to delete</span>
                <span className="font-semibold text-slate-600"> {description}</span>
                <span>
                  ? This data will be permanently removed. This action
                  cannot be undone.
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Alert close button */}
        <button
          type="button"
          className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <MdClose className="cursor-pointer" size={18} onClick={onClose} />
          <span className="sr-only">Close</span>
        </button>

        {/* Alert body */}
        <div className="relative flex-auto pt-6">{children}</div>

        {/* Alert footer */}
        {onSubmit && (
          <div className="flex flex-shrink-0 flex-wrap justify-end items-center gap-2">
            <Button
              variant="white"
              label="Cancel"
              onClick={onClose}
              disabled={isLoading}
            />
            <Button
              variant="danger"
              label="Continue"
              onClick={onSubmit}
              disabled={isLoading}
            />
          </div>
        )}
      </motion.dialog>
    </div>,
    document.getElementById('modal')!
  );
};

export default Alert;
