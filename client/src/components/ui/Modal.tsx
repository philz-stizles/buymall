"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Button } from ".";

type ModalProps = {
  isOpen?: boolean;
  disabled?: boolean;
  title?: string;
  subtitle?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  onClose: () => void;
  onSubmit: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  disabled,
  title,
  body,
  footer,
  actionLabel,
  onClose,
  onSubmit,
  secondaryActionLabel,
  onSecondaryAction,
}) => {
  const [isShowing, setIsShowing] = useState(isOpen);

  useEffect(() => {
    setIsShowing(isOpen);
  }, [isOpen]);

  const closeHandler = useCallback(() => {
    if (disabled) {
      return;
    }

    setIsShowing(false);

    setTimeout(() => {
      onClose();
    }, 500);
  }, [disabled, onClose]);

  const submitHandler = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const secondaryActionHandler = useCallback(() => {
    if (disabled || !onSecondaryAction) {
      return;
    }

    onSecondaryAction();
  }, [disabled, onSecondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed z-50 flex justify-center items-center bg-neutral-800/70 inset-0 outline-none focus:outline-none overflow-x-hidden overflow-y-auto">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 h-full lg:h-auto md:h-auto mx-auto my-6">
          {/* CONTENT */}
          <div
            className={`h-full translate duration-300
            ${isShowing ? "translate-y-0" : "translate-y-full"}
            ${isShowing ? "opacity-100" : "opacity-0"}`}
          >
            <div className="relative bg-white w-full h-full lg:h-auto md:h-auto flex flex-col rounded-lg shadow-lg border-0 outline-none focus:outline-none translate">
              {/* HEADER */}
              <div className="relative flex justify-center items-center rounded-t p-4 border-b-[1px]">
                <button
                  className="absolute p-1 border-0 transition left-9 hover:opacity-70"
                  onClick={closeHandler}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* BODY */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryActionLabel && (
                    <Button
                      label={secondaryActionLabel}
                      outlined
                      onClick={secondaryActionHandler}
                      disabled={disabled}
                    />
                  )}
                  <Button
                    label={actionLabel}
                    onClick={submitHandler}
                    disabled={disabled}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

